-- ============================================================
-- FILE: 02_education_content.sql
-- DESC: Tabel konten edukasi: kategori, artikel, video,
--       infografis, kuis, dan soal kuis
-- URUTAN MIGRASI: Jalankan KEDUA (setelah 01)
-- ============================================================

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE content_type AS ENUM ('article', 'video', 'infographic', 'quiz');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- ============================================================
-- TABEL: categories
-- Kategori konten edukasi
-- ============================================================

CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    icon        TEXT,                            -- nama icon lucide-react
    color       TEXT,                            -- hex color untuk tampilan
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed data kategori
INSERT INTO categories (name, slug, description, icon, color, sort_order) VALUES
    ('Semua', 'all', 'Semua kategori', 'grid', '#0D9488', 0),
    ('Pubertas & Perkembangan', 'pubertas', 'Informasi seputar masa pubertas', 'user', '#8B5CF6', 1),
    ('Kesehatan Reproduksi', 'kesehatan-reproduksi', 'Edukasi kesehatan reproduksi', 'heart', '#EF4444', 2),
    ('Perkawinan Anak', 'perkawinan-anak', 'Dampak dan pencegahan perkawinan anak', 'shield', '#F59E0B', 3),
    ('Hubungan Sehat', 'hubungan-sehat', 'Membangun hubungan yang sehat', 'users', '#10B981', 4),
    ('Hak & Pendidikan', 'hak-pendidikan', 'Hak anak dan pentingnya pendidikan', 'book-open', '#3B82F6', 5),
    ('Kesehatan Mental', 'kesehatan-mental', 'Menjaga kesehatan mental remaja', 'brain', '#EC4899', 6);

-- ============================================================
-- TABEL: contents
-- Konten utama (artikel, video, infografis, kuis)
-- Dibuat oleh admin atau konselor
-- ============================================================

CREATE TABLE contents (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
    category_id     UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    type            content_type NOT NULL,
    status          content_status NOT NULL DEFAULT 'draft',
    title           TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    excerpt         TEXT,                        -- ringkasan singkat untuk card
    body            TEXT,                        -- konten artikel (markdown/html)
    cover_image_url TEXT,
    video_url       TEXT,                        -- untuk tipe video
    infographic_url TEXT,                        -- untuk tipe infografis
    read_time_min   INT,                         -- estimasi waktu baca (menit)
    difficulty      difficulty_level DEFAULT 'beginner',
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    view_count      INT NOT NULL DEFAULT 0,
    tags            TEXT[],                      -- array of tags
    published_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL: quizzes
-- Detail kuis yang terhubung ke contents (type = 'quiz')
-- ============================================================

CREATE TABLE quizzes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id      UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    passing_score   INT NOT NULL DEFAULT 70,     -- nilai minimum lulus (%)
    time_limit_min  INT,                         -- batas waktu dalam menit (null = tidak ada batas)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_quiz_per_content UNIQUE (content_id)
);

-- ============================================================
-- TABEL: quiz_questions
-- Soal-soal untuk setiap kuis (pilihan ganda)
-- ============================================================

CREATE TABLE quiz_questions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id         UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text   TEXT NOT NULL,
    options         JSONB NOT NULL,              -- [{"id": "a", "text": "..."}, ...]
    correct_option  TEXT NOT NULL,               -- id dari opsi yang benar
    explanation     TEXT,                        -- penjelasan jawaban benar
    sort_order      INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_contents_author_id ON contents(author_id);
CREATE INDEX idx_contents_category_id ON contents(category_id);
CREATE INDEX idx_contents_type ON contents(type);
CREATE INDEX idx_contents_status ON contents(status);
CREATE INDEX idx_contents_slug ON contents(slug);
CREATE INDEX idx_contents_is_featured ON contents(is_featured);
CREATE INDEX idx_contents_published_at ON contents(published_at DESC);
CREATE INDEX idx_contents_tags ON contents USING GIN(tags);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- categories: semua bisa baca
CREATE POLICY "categories_select_all" ON categories
    FOR SELECT USING (true);

-- contents: published bisa dibaca semua, draft hanya author/admin
CREATE POLICY "contents_select_published" ON contents
    FOR SELECT USING (
        status = 'published'
        OR auth.uid() = author_id
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "contents_insert_counselor_admin" ON contents
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('counselor', 'admin')
        )
    );

CREATE POLICY "contents_update_author_admin" ON contents
    FOR UPDATE USING (
        auth.uid() = author_id
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "contents_delete_author_admin" ON contents
    FOR DELETE USING (
        auth.uid() = author_id
        OR EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- quizzes dan quiz_questions: ikuti policy contents
CREATE POLICY "quizzes_select_all" ON quizzes
    FOR SELECT USING (true);

CREATE POLICY "quizzes_insert_counselor_admin" ON quizzes
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('counselor', 'admin')
        )
    );

CREATE POLICY "quiz_questions_select_all" ON quiz_questions
    FOR SELECT USING (true);

CREATE POLICY "quiz_questions_insert_counselor_admin" ON quiz_questions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role IN ('counselor', 'admin')
        )
    );

-- ============================================================
-- TRIGGER: auto-update updated_at
-- ============================================================

CREATE TRIGGER contents_updated_at
    BEFORE UPDATE ON contents
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- FUNCTION: increment view count
-- ============================================================

CREATE OR REPLACE FUNCTION increment_view_count(content_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE contents SET view_count = view_count + 1 WHERE id = content_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
