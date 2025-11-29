// src/lib/auth-session.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getCurrentSession() {
  const session = await getServerSession(authOptions);
  return session;
}
