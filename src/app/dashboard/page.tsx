import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-helpers";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "LAWYER") {
    redirect("/dashboard/lawyer");
  } else if (user.role === "CLIENT") {
    redirect("/dashboard/client");
  }

  return null;
}

