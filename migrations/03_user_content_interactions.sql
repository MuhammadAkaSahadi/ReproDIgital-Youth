-- ============================================================
-- FILE: 03_user_content_interactions.sql
-- DESC: Interaksi user dengan konten: progress baca,
--       bookmark, hasil kuis, dan riwayat aktivitas
-- URUTAN MIGRASI: Jalankan KETIGA (setelah 02)
-- ============================================================

-- ============================================================
-- TABEL: content_progress
-- Menyimpan progress membaca/menonton konten per user
-- ============================================================

CREATE TABLE content_progress (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content_id      UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    progress_pct    INT NOT NULL DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    last_accessed   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_content_progress UNIQUE (user_id, content_id)
);

-- ============================================================
-- TABEL: bookmarks
-- Konten yang disimpan/di-bookmark oleh user
-- ============================================================

CREATE TABLE bookmarks (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content_id  UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_bookmark UNIQUE (user_id, content_id)
);

-- ============================================================
-- TABEL: content_feedback
-- Feedback thumbs up/down pada artikel
-- ============================================================

CREATE TABLE content_feedback (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content_id  UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    is_helpful  BOOLEAN NOT NULL,                -- true = thumbs up, false = thumbs down
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_content_feedback UNIQUE (user_id, content_id)
);

-- ============================================================
-- TABEL: quiz_attempts
-- Riwayat percobaan kuis oleh user
-- ============================================================

CREATE TABLE quiz_attempts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    quiz_id         UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score           INT NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
    is_passed       BOOLEAN NOT NULL DEFAULT FALSE,
    answers         JSONB NOT NULL DEFAULT '{}', -- {"question_id": "selected_option", ...}
    time_taken_sec  INT,                         -- waktu pengerjaan dalam detik
    completed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_content_progress_user_id ON content_progress(user_id);
CREATE INDEX idx_content_progress_content_id ON content_progress(content_id);
CREATE INDEX idx_content_progress_is_completed ON content_progress(is_completed);
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_content_id ON bookmarks(content_id);
CREATE INDEX idx_content_feedback_content_id ON content_feedback(content_id);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE content_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- content_progress: user hanya bisa akses milik sendiri
CREATE POLICY "content_progress_own" ON content_progress
    FOR ALL USING (auth.uid() = user_id);

-- bookmarks: user hanya bisa akses milik sendiri
CREATE POLICY "bookmarks_own" ON bookmarks
    FOR ALL USING (auth.uid() = user_id);

-- content_feedback: user hanya bisa akses milik sendiri
CREATE POLICY "content_feedback_own" ON content_feedback
    FOR ALL USING (auth.uid() = user_id);

-- quiz_attempts: user akses milik sendiri, konselor/admin bisa baca semua
CREATE POLICY "quiz_attempts_own_or_counselor" ON quiz_attempts
    FOR SELECT USING (
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('counselor', 'admin')
        )
    );

CREATE POLICY "quiz_attempts_insert_own" ON quiz_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: auto-update updated_at
-- ============================================================

CREATE TRIGGER content_progress_updated_at
    BEFORE UPDATE ON content_progress
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
