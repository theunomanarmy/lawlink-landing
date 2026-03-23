import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabaseAdmin: SupabaseClient | null = null

function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are required for storage')
    }
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
  }
  return _supabaseAdmin
}

export async function uploadFileToStorage(
  bucket: string,
  path: string,
  file: File,
): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin()
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  const { data } = getSupabaseAdmin().storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFileFromStorage(
  bucket: string,
  path: string,
): Promise<void> {
  const { error } = await getSupabaseAdmin().storage.from(bucket).remove([path])
  if (error) console.warn('Storage delete failed:', error.message)
}

