-- ============================================================
-- FILE: 01_users_profiles.sql
-- DESC: Tabel dasar user, profil, dan role
-- URUTAN MIGRASI: Jalankan PERTAMA
-- ============================================================

-- Enable UUID extension (sudah aktif di Supabase by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_role AS ENUM ('student', 'counselor', 'admin');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'prefer_not_to_say');

-- ============================================================
-- TABEL: profiles
-- Ekstensi dari auth.users milik Supabase Auth
-- Dibuat otomatis via trigger saat user register
-- ============================================================

CREATE TABLE profiles (
    id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role            user_role NOT NULL DEFAULT 'student',
    email           TEXT,
    full_name       TEXT,
    username        TEXT UNIQUE,
    avatar_url      TEXT,
    bio             TEXT,
    gender          gender_type,
    birth_date      DATE,
    school_name     TEXT,                        -- nama sekolah (untuk student)
    grade           TEXT,                        -- kelas (untuk student)
    specialization  TEXT,                        -- spesialisasi (untuk counselor)
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified     BOOLEAN NOT NULL DEFAULT FALSE, -- verifikasi akun konselor oleh admin
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABEL: counselor_stats
-- Statistik khusus untuk konselor (ditampilkan di card konselor)
-- ============================================================

CREATE TABLE counselor_stats (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    counselor_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    total_sessions  INT NOT NULL DEFAULT 0,
    avg_rating      NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
    total_ratings   INT NOT NULL DEFAULT 0,
    is_online       BOOLEAN NOT NULL DEFAULT FALSE,
    last_seen       TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_counselor_stats UNIQUE (counselor_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_counselor_stats_counselor_id ON counselor_stats(counselor_id);
CREATE INDEX idx_counselor_stats_is_online ON counselor_stats(is_online);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE counselor_stats ENABLE ROW LEVEL SECURITY;

-- profiles: user hanya bisa lihat semua profil (publik), tapi edit profil sendiri
CREATE POLICY "profiles_select_all" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "profiles_insert_own" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- counselor_stats: semua bisa baca, hanya system/admin yang update
CREATE POLICY "counselor_stats_select_all" ON counselor_stats
    FOR SELECT USING (true);

CREATE POLICY "counselor_stats_update_own" ON counselor_stats
    FOR UPDATE USING (
        auth.uid() = counselor_id
    );

-- ============================================================
-- TRIGGER: auto-create profile saat user register
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url',
        'student'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- TRIGGER: auto-update updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER counselor_stats_updated_at
    BEFORE UPDATE ON counselor_stats
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
