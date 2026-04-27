-- ============================================================
-- FILE: 09_add_email_to_profiles.sql
-- DESC: Menambahkan kolom email pada profil dan update trigger
-- ============================================================

-- Tambahkan kolom email jika belum ada
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Update fungsi handle_new_user untuk memasukkan email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    'student'
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Jika terjadi error saat insert profil, log error-nya tapi JANGAN batalkan pembuatan user.
    -- Biarkan user masuk, nanti sistem Onboarding Next.js yang akan menangani profilnya.
    RAISE LOG 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
