import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side only client — uses service role key, bypasses RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function uploadFileToStorage(
  bucket: string,
  path: string,
  file: File,
): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFileFromStorage(
  bucket: string,
  path: string,
): Promise<void> {
  const { error } = await supabaseAdmin.storage.from(bucket).remove([path])
  if (error) console.warn('Storage delete failed:', error.message)
}

