import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  // If user already has a session, no need to sign up again
  if (session?.user?.email) {
    redirect("/dashboard");
  }

  // For now, sign-up = go to the same NextAuth sign-in page
  // You can later customize this with a "Create workspace" flow.
  redirect("/api/auth/signin?callbackUrl=/dashboard");
}
