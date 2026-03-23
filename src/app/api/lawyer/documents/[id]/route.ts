import { NextResponse } from 'next/server'
import { requireLawyer } from '@/lib/auth-helpers'
import { prisma } from '@/lib/prisma'
import { deleteFileFromStorage } from '@/lib/supabase-storage'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireLawyer()
    const { id } = await params

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    })
    if (!lawyerProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const document = await prisma.document.findUnique({ where: { id } })
    if (!document || document.lawyerProfileId !== lawyerProfile.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Extract the storage path from the public URL
    // URL format: https://[ref].supabase.co/storage/v1/object/public/lawlink-documents/[path]
    try {
      const url = new URL(document.fileUrl)
      const storagePath = url.pathname.split('/lawlink-documents/')[1]
      if (storagePath) {
        await deleteFileFromStorage('lawlink-documents', storagePath)
      }
    } catch {
      console.warn('Could not delete file from storage')
    }

    await prisma.document.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes('redirect')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Document delete error:', error)
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
  }
}

