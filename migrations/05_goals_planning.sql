-- ============================================================
-- FILE: 05_goals_planning.sql
-- DESC: Tabel perencanaan masa depan: goals, milestones,
--       catatan, dan resource terkait goal
--       Goal bisa dilihat oleh konselor yang menangani siswa
-- URUTAN MIGRASI: Jalankan KELIMA (setelah 04)
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE goal_category AS ENUM ('education', 'career', 'health', 'financial', 'personal');
CREATE TYPE goal_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE goal_status AS ENUM ('active', 'completed', 'paused', 'cancelled');

-- ============================================================
-- TABEL: goals
-- Tujuan/goal yang dibuat oleh siswa
-- Dapat dilihat oleh konselor yang memiliki sesi aktif
-- ============================================================

CREATE TABLE goals (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    description     TEXT,
    category        goal_category NOT NULL,
    priority        goal_priority NOT NULL DEFAULT 'medium',
    status          goal_status NOT NULL DEFAULT 'active',
    target_date     DATE,
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL: goal_milestones
-- Langkah-langkah untuk mencapai satu goal
-- ============================================================

CREATE TABLE goal_milestones (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id         UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    due_date        DATE,
    completed_at    TIMESTAMPTZ,
    sort_order      INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL: goal_notes
-- Catatan yang ditambahkan user ke sebuah goal
-- ============================================================

CREATE TABLE goal_notes (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id     UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL: goal_resources
-- Konten edukasi yang dikaitkan ke sebuah goal
-- ============================================================

CREATE TABLE goal_resources (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id     UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    content_id  UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    added_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_goal_resource UNIQUE (goal_id, content_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_goals_category ON goals(category);
CREATE INDEX idx_goals_target_date ON goals(target_date);
CREATE INDEX idx_goal_milestones_goal_id ON goal_milestones(goal_id);
CREATE INDEX idx_goal_milestones_is_completed ON goal_milestones(is_completed);
CREATE INDEX idx_goal_notes_goal_id ON goal_notes(goal_id);
CREATE INDEX idx_goal_resources_goal_id ON goal_resources(goal_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_resources ENABLE ROW LEVEL SECURITY;

-- goals: pemilik bisa full access
--        konselor yang punya sesi aktif dengan siswa bisa READ
--        admin bisa READ semua
CREATE POLICY "goals_owner_full_access" ON goals
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "goals_counselor_read" ON goals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM counseling_sessions cs
            WHERE cs.student_id = goals.user_id
            AND cs.counselor_id = auth.uid()
            AND cs.status IN ('active', 'ended')
        )
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- goal_milestones: ikuti akses goal
CREATE POLICY "milestones_owner_full_access" ON goal_milestones
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM goals
            WHERE id = goal_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "milestones_counselor_read" ON goal_milestones
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM goals g
            JOIN counseling_sessions cs ON cs.student_id = g.user_id
            WHERE g.id = goal_id
            AND cs.counselor_id = auth.uid()
            AND cs.status IN ('active', 'ended')
        )
    );

-- goal_notes: hanya pemilik yang bisa akses
CREATE POLICY "goal_notes_owner_only" ON goal_notes
    FOR ALL USING (auth.uid() = user_id);

-- goal_resources: ikuti akses goal
CREATE POLICY "goal_resources_owner_full" ON goal_resources
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM goals
            WHERE id = goal_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "goal_resources_counselor_read" ON goal_resources
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM goals g
            JOIN counseling_sessions cs ON cs.student_id = g.user_id
            WHERE g.id = goal_id
            AND cs.counselor_id = auth.uid()
        )
    );

-- ============================================================
-- TRIGGERS
-- ============================================================

CREATE TRIGGER goals_updated_at
    BEFORE UPDATE ON goals
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER goal_milestones_updated_at
    BEFORE UPDATE ON goal_milestones
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER goal_notes_updated_at
    BEFORE UPDATE ON goal_notes
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- FUNCTION: hitung progress goal berdasarkan milestones
-- ============================================================

CREATE OR REPLACE FUNCTION get_goal_progress(p_goal_id UUID)
RETURNS INT AS $$
DECLARE
    total_milestones INT;
    completed_milestones INT;
BEGIN
    SELECT COUNT(*) INTO total_milestones
    FROM goal_milestones WHERE goal_id = p_goal_id;

    IF total_milestones = 0 THEN
        RETURN 0;
    END IF;

    SELECT COUNT(*) INTO completed_milestones
    FROM goal_milestones
    WHERE goal_id = p_goal_id AND is_completed = TRUE;

    RETURN ROUND((completed_milestones::NUMERIC / total_milestones) * 100);
END;
$$ LANGUAGE plpgsql;
