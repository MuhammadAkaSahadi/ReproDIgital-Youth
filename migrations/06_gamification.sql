-- ============================================================
-- FILE: 06_gamification.sql
-- DESC: Tabel gamifikasi: badge definisi, user badges,
--       streak harian, dan sistem poin
-- URUTAN MIGRASI: Jalankan KEENAM (setelah 05)
-- ============================================================

-- ============================================================
-- TABEL: badges
-- Master data badge yang tersedia di platform
-- ============================================================

CREATE TABLE badges (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    description     TEXT NOT NULL,
    icon            TEXT NOT NULL,               -- nama icon atau path ilustrasi
    color           TEXT NOT NULL DEFAULT '#0D9488',
    condition_type  TEXT NOT NULL,               -- 'first_goal', 'streak_7', 'goals_completed_3', dst
    condition_value INT NOT NULL DEFAULT 1,      -- nilai ambang batas kondisi
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed data badge
INSERT INTO badges (name, description, icon, color, condition_type, condition_value) VALUES
    ('Pemula', 'Membuat tujuan pertamamu', 'star', '#F59E0B', 'first_goal', 1),
    ('Konsisten', 'Login 7 hari berturut-turut', 'flame', '#EF4444', 'streak_days', 7),
    ('Pencatat', 'Menyelesaikan 3 tujuan', 'trophy', '#8B5CF6', 'goals_completed', 3),
    ('Penjelajah', 'Membaca konten dari semua kategori', 'compass', '#10B981', 'all_categories', 1),
    ('Inspirasi', 'Berbagi tujuan pertamamu', 'share-2', '#3B82F6', 'shared_goal', 1),
    ('Kuiz Master', 'Lulus 5 kuis dengan nilai sempurna', 'award', '#EC4899', 'perfect_quiz', 5),
    ('Rajin Belajar', 'Membaca 10 artikel', 'book-open', '#0D9488', 'articles_read', 10),
    ('Streak Legend', 'Login 30 hari berturut-turut', 'zap', '#F97316', 'streak_days', 30);

-- ============================================================
-- TABEL: user_badges
-- Badge yang sudah diraih oleh user
-- ============================================================

CREATE TABLE user_badges (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    badge_id    UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_badge UNIQUE (user_id, badge_id)
);

-- ============================================================
-- TABEL: user_streaks
-- Streak harian user (dihitung dari aktivitas login/akses konten)
-- ============================================================

CREATE TABLE user_streaks (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    current_streak      INT NOT NULL DEFAULT 0,
    longest_streak      INT NOT NULL DEFAULT 0,
    last_activity_date  DATE,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_streak UNIQUE (user_id)
);

-- ============================================================
-- TABEL: daily_activities
-- Log aktivitas harian untuk menghitung streak
-- ============================================================

CREATE TABLE daily_activities (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    activity_date   DATE NOT NULL DEFAULT CURRENT_DATE,
    activity_type   TEXT NOT NULL,               -- 'login', 'read_content', 'complete_quiz', dll
    metadata        JSONB,                       -- data tambahan (content_id, dll)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_activity_per_day UNIQUE (user_id, activity_date, activity_type)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);
CREATE INDEX idx_user_streaks_user_id ON user_streaks(user_id);
CREATE INDEX idx_daily_activities_user_id ON daily_activities(user_id);
CREATE INDEX idx_daily_activities_date ON daily_activities(activity_date DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activities ENABLE ROW LEVEL SECURITY;

-- badges: semua bisa baca (master data publik)
CREATE POLICY "badges_select_all" ON badges
    FOR SELECT USING (true);

-- user_badges: user hanya akses milik sendiri
CREATE POLICY "user_badges_own" ON user_badges
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_badges_insert_system" ON user_badges
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- user_streaks: user hanya akses milik sendiri
CREATE POLICY "user_streaks_own" ON user_streaks
    FOR ALL USING (auth.uid() = user_id);

-- daily_activities: user hanya akses milik sendiri
CREATE POLICY "daily_activities_own" ON daily_activities
    FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- FUNCTION: update streak saat ada aktivitas baru
-- ============================================================

CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_last_date DATE;
    v_current   INT;
    v_longest   INT;
    v_today     DATE := CURRENT_DATE;
BEGIN
    SELECT last_activity_date, current_streak, longest_streak
    INTO v_last_date, v_current, v_longest
    FROM user_streaks WHERE user_id = p_user_id;

    IF NOT FOUND THEN
        -- User belum punya streak record
        INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (p_user_id, 1, 1, v_today);
        RETURN;
    END IF;

    IF v_last_date = v_today THEN
        -- Sudah aktif hari ini, tidak perlu update
        RETURN;
    ELSIF v_last_date = v_today - INTERVAL '1 day' THEN
        -- Hari berturut-turut, tambah streak
        v_current := v_current + 1;
        v_longest := GREATEST(v_longest, v_current);
    ELSE
        -- Streak putus, reset
        v_current := 1;
    END IF;

    UPDATE user_streaks SET
        current_streak      = v_current,
        longest_streak      = v_longest,
        last_activity_date  = v_today,
        updated_at          = NOW()
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- TRIGGER: update streak otomatis saat ada daily_activity baru
-- ============================================================

CREATE OR REPLACE FUNCTION trigger_update_streak()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM update_user_streak(NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_daily_activity_insert
    AFTER INSERT ON daily_activities
    FOR EACH ROW EXECUTE FUNCTION trigger_update_streak();
