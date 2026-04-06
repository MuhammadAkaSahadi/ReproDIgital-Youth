-- ============================================================
-- FILE: 04_counseling.sql
-- DESC: Tabel sesi konseling dan pesan chat real-time
--       Satu siswa bisa memiliki MULTIPLE sesi aktif
--       dengan konselor yang berbeda
-- URUTAN MIGRASI: Jalankan KEEMPAT (setelah 03)
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE session_status AS ENUM ('pending', 'active', 'ended', 'cancelled');
CREATE TYPE message_type AS ENUM ('text', 'resource', 'system', 'quick_reply');
CREATE TYPE resource_type AS ENUM ('article', 'video', 'infographic', 'quiz');

-- ============================================================
-- TABEL: counseling_sessions
-- Satu record = satu sesi konseling antara siswa dan konselor
-- Siswa bisa punya banyak sesi dengan konselor berbeda
-- ============================================================

CREATE TABLE counseling_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    counselor_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status          session_status NOT NULL DEFAULT 'pending',
    topic           TEXT,                        -- topik konseling (opsional)
    student_rating  INT CHECK (student_rating BETWEEN 1 AND 5),
    student_feedback TEXT,
    started_at      TIMESTAMPTZ,
    ended_at        TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT no_duplicate_active_session
        UNIQUE NULLS NOT DISTINCT (student_id, counselor_id, status)
        -- Siswa tidak bisa punya 2 sesi AKTIF dengan konselor yang SAMA
        -- tapi bisa aktif dengan konselor berbeda
);

-- ============================================================
-- TABEL: messages
-- Pesan dalam sesi konseling (digunakan dengan Supabase Realtime)
-- ============================================================

CREATE TABLE messages (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id      UUID NOT NULL REFERENCES counseling_sessions(id) ON DELETE CASCADE,
    sender_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
    type            message_type NOT NULL DEFAULT 'text',
    content         TEXT,                        -- isi pesan teks
    resource_data   JSONB,                       -- untuk type='resource': {content_id, title, excerpt, type}
    quick_replies   JSONB,                       -- untuk type='quick_reply': ["opsi 1", "opsi 2", ...]
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    read_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL: session_ratings
-- Rating detail setelah sesi berakhir
-- ============================================================

CREATE TABLE session_ratings (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id      UUID NOT NULL REFERENCES counseling_sessions(id) ON DELETE CASCADE,
    student_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    counselor_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating          INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    feedback        TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_session_rating UNIQUE (session_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_counseling_sessions_student_id ON counseling_sessions(student_id);
CREATE INDEX idx_counseling_sessions_counselor_id ON counseling_sessions(counselor_id);
CREATE INDEX idx_counseling_sessions_status ON counseling_sessions(status);
CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_session_ratings_counselor_id ON session_ratings(counselor_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE counseling_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_ratings ENABLE ROW LEVEL SECURITY;

-- counseling_sessions: hanya student dan counselor terkait yang bisa akses
CREATE POLICY "sessions_participant_only" ON counseling_sessions
    FOR SELECT USING (
        auth.uid() = student_id
        OR auth.uid() = counselor_id
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "sessions_insert_student" ON counseling_sessions
    FOR INSERT WITH CHECK (
        auth.uid() = student_id
        AND EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'student'
        )
    );

CREATE POLICY "sessions_update_participant" ON counseling_sessions
    FOR UPDATE USING (
        auth.uid() = student_id OR auth.uid() = counselor_id
    );

-- messages: hanya peserta sesi yang bisa baca/kirim
CREATE POLICY "messages_session_participant" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM counseling_sessions cs
            WHERE cs.id = session_id
            AND (cs.student_id = auth.uid() OR cs.counselor_id = auth.uid())
        )
    );

CREATE POLICY "messages_insert_participant" ON messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id
        AND EXISTS (
            SELECT 1 FROM counseling_sessions cs
            WHERE cs.id = session_id
            AND (cs.student_id = auth.uid() OR cs.counselor_id = auth.uid())
            AND cs.status = 'active'
        )
    );

CREATE POLICY "messages_update_read_status" ON messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM counseling_sessions cs
            WHERE cs.id = session_id
            AND (cs.student_id = auth.uid() OR cs.counselor_id = auth.uid())
        )
    );

-- session_ratings: student terkait yang bisa insert, semua peserta bisa baca
CREATE POLICY "ratings_select_participant" ON session_ratings
    FOR SELECT USING (
        auth.uid() = student_id OR auth.uid() = counselor_id
    );

CREATE POLICY "ratings_insert_student" ON session_ratings
    FOR INSERT WITH CHECK (auth.uid() = student_id);

-- ============================================================
-- TRIGGER: update counselor_stats setelah rating masuk
-- ============================================================

CREATE OR REPLACE FUNCTION update_counselor_stats_on_rating()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO counselor_stats (counselor_id, total_sessions, avg_rating, total_ratings)
    VALUES (NEW.counselor_id, 1, NEW.rating, 1)
    ON CONFLICT (counselor_id) DO UPDATE SET
        total_sessions  = counselor_stats.total_sessions + 1,
        total_ratings   = counselor_stats.total_ratings + 1,
        avg_rating      = (
            (counselor_stats.avg_rating * counselor_stats.total_ratings + NEW.rating)
            / (counselor_stats.total_ratings + 1)
        ),
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_session_rated
    AFTER INSERT ON session_ratings
    FOR EACH ROW EXECUTE FUNCTION update_counselor_stats_on_rating();

-- ============================================================
-- TRIGGER: auto-update updated_at
-- ============================================================

CREATE TRIGGER counseling_sessions_updated_at
    BEFORE UPDATE ON counseling_sessions
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- Enable Realtime untuk tabel messages
-- (Jalankan di Supabase Dashboard > Database > Replication
--  atau via SQL berikut)
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE counseling_sessions;
