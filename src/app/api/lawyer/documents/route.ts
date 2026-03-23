import { NextRequest, NextResponse } from 'next/server'
import { requireLawyer } from '@/lib/auth-helpers'
import { prisma } from '@/lib/prisma'
import { uploadFileToStorage } from '@/lib/supabase-storage'
import { DocumentType } from '@prisma/client'

export async function GET() {
  try {
    const user = await requireLawyer()
    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    })
    if (!lawyerProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }
    const documents = await prisma.document.findMany({
      where: { lawyerProfileId: lawyerProfile.id },
      orderBy: { uploadedAt: 'desc' },
    })
    return NextResponse.json(documents)
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes('redirect')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Documents fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireLawyer()
    const formData = await req.formData()

    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null
    const fileTypeRaw = formData.get('fileType') as string

    if (!file || !title) {
      return NextResponse.json(
        { error: 'File and title are required' },
        { status: 400 },
      )
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const maxSize = parseInt(process.env.MAX_FILE_SIZE || '5242880')
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const lawyerProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: user.id },
    })
    if (!lawyerProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const fileName = `${lawyerProfile.id}/${Date.now()}-${file.name}`
    const fileUrl = await uploadFileToStorage('lawlink-documents', fileName, file)

    const validFileTypes: DocumentType[] = ['CERTIFICATE', 'LICENSE', 'AWARD', 'OTHER']
    const fileType: DocumentType = validFileTypes.includes(fileTypeRaw as DocumentType)
      ? (fileTypeRaw as DocumentType)
      : 'OTHER'

    const document = await prisma.document.create({
      data: {
        lawyerProfileId: lawyerProfile.id,
        fileUrl,
        fileType,
        title,
        description: description ?? undefined,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes('redirect')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Document upload error:', error)
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 })
  }
}

