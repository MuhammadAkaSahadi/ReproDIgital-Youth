-- ============================================================
-- FILE: 07_notifications.sql
-- DESC: Tabel notifikasi in-app untuk semua jenis event
-- URUTAN MIGRASI: Jalankan KETUJUH (setelah 06)
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE notification_type AS ENUM (
    'new_message',          -- pesan baru dari konselor/siswa
    'session_started',      -- sesi konseling dimulai
    'session_ended',        -- sesi konseling berakhir
    'badge_earned',         -- badge baru diraih
    'goal_reminder',        -- pengingat deadline goal
    'goal_completed',       -- goal berhasil diselesaikan
    'new_content',          -- konten baru dipublikasikan
    'streak_milestone',     -- pencapaian streak (7 hari, 30 hari, dll)
    'system'                -- notifikasi sistem
);

-- ============================================================
-- TABEL: notifications
-- ============================================================

CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type        notification_type NOT NULL,
    title       TEXT NOT NULL,
    body        TEXT,
    data        JSONB,                           -- payload tambahan (session_id, badge_id, dll)
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    read_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- user hanya bisa akses notifikasi milik sendiri
CREATE POLICY "notifications_own" ON notifications
    FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Enable Realtime untuk notifikasi
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- ============================================================
-- FUNCTION: helper untuk membuat notifikasi
-- ============================================================

CREATE OR REPLACE FUNCTION create_notification(
    p_user_id   UUID,
    p_type      notification_type,
    p_title     TEXT,
    p_body      TEXT DEFAULT NULL,
    p_data      JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO notifications (user_id, type, title, body, data)
    VALUES (p_user_id, p_type, p_title, p_body, p_data)
    RETURNING id INTO v_id;
    RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- TRIGGER: notifikasi otomatis saat pesan baru masuk
-- ============================================================

CREATE OR REPLACE FUNCTION notify_on_new_message()
RETURNS TRIGGER AS $$
DECLARE
    v_session   counseling_sessions%ROWTYPE;
    v_sender    profiles%ROWTYPE;
    v_recipient UUID;
BEGIN
    SELECT * INTO v_session FROM counseling_sessions WHERE id = NEW.session_id;
    SELECT * INTO v_sender FROM profiles WHERE id = NEW.sender_id;

    -- Tentukan penerima notifikasi (lawan bicara)
    IF NEW.sender_id = v_session.student_id THEN
        v_recipient := v_session.counselor_id;
    ELSE
        v_recipient := v_session.student_id;
    END IF;

    -- Hanya kirim notifikasi untuk pesan teks dan resource
    IF NEW.type IN ('text', 'resource') THEN
        PERFORM create_notification(
            v_recipient,
            'new_message',
            'Pesan baru dari ' || COALESCE(v_sender.full_name, 'Seseorang'),
            CASE WHEN NEW.type = 'text' THEN LEFT(NEW.content, 100) ELSE 'Mengirim sebuah resource' END,
            jsonb_build_object('session_id', NEW.session_id, 'sender_id', NEW.sender_id)
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_message
    AFTER INSERT ON messages
    FOR EACH ROW EXECUTE FUNCTION notify_on_new_message();

-- ============================================================
-- TRIGGER: notifikasi saat badge diraih
-- ============================================================

CREATE OR REPLACE FUNCTION notify_on_badge_earned()
RETURNS TRIGGER AS $$
DECLARE
    v_badge badges%ROWTYPE;
BEGIN
    SELECT * INTO v_badge FROM badges WHERE id = NEW.badge_id;

    PERFORM create_notification(
        NEW.user_id,
        'badge_earned',
        'Lencana Baru: ' || v_badge.name,
        v_badge.description,
        jsonb_build_object('badge_id', NEW.badge_id, 'badge_name', v_badge.name)
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_badge_earned
    AFTER INSERT ON user_badges
    FOR EACH ROW EXECUTE FUNCTION notify_on_badge_earned();
