import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  // Already logged in? Go straight to Mission Control
  if (session?.user?.email) {
    redirect("/dashboard");
  }

  // Not logged in → send to NextAuth's built-in sign-in UI
  redirect("/api/auth/signin");
}
