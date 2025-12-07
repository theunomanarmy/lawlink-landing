import { requireLawyer } from "@/lib/auth-helpers";
import DocumentUploadClient from "@/components/DocumentUploadClient";

export default async function DocumentUploadPage() {
  await requireLawyer();
  return <DocumentUploadClient />;
}

