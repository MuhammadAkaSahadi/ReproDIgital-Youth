import { createClient } from "./client";

/**
 * Uploads a file to a Supabase Storage bucket.
 * For large files over 6MB, Supabase uppy/TUS implementation is recommended, 
 * but standard uploader automatically handles multipart.
 * 
 * @param bucketName Name of the storage bucket
 * @param path Path within bucket where file should be stored (e.g. 'avatars/user123.png')
 * @param file The File object from input
 * @returns Object with URL string or error
 */
export async function uploadResumableFile(bucketName: string, path: string, file: File) {
  const supabase = createClient();
  
  // Standard upload uses TUS conditionally underneath in modern supabase-js for larger files
  // upsert=true safely replaces existing avatars with the same path/name
  const { data, error } = await supabase.storage.from(bucketName).upload(path, file, {
    upsert: true, 
  });

  if (error) {
    console.error(`Gagal mengunggah ke bucket ${bucketName}:`, error);
    return { success: false, error: error.message };
  }

  // Generate public URL
  const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(path);

  return { success: true, url: publicUrlData.publicUrl, data };
}
