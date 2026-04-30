import { cookies } from "next/headers";
import type { UserRole } from "@/data/users";
import { getUserById, type DemoUser } from "@/data/users";

const COOKIE_NAME = "fr_demo_session";

export interface SessionPayload {
  userId: string;
  role: UserRole;
  companyId?: string;
  name: string;
}

export async function getSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  const raw = c.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionPayload;
    if (!parsed.userId || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<DemoUser | null> {
  const session = await getSession();
  if (!session) return null;
  return getUserById(session.userId) ?? null;
}

export async function setSession(payload: SessionPayload) {
  const c = await cookies();
  c.set(COOKIE_NAME, JSON.stringify(payload), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function clearSession() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}
