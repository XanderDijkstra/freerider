"use server";

import { redirect } from "next/navigation";
import { getUserById } from "@/data/users";
import {
  addDriverFavoriteLocation,
  removeDriverFavoriteLocation,
  setCompanyStatus,
  setUserStatus,
} from "@/data/store";
import { setSession, clearSession, getSession } from "./session";
import { revalidatePath } from "next/cache";

export async function loginAsUser(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  const user = getUserById(userId);
  if (!user) throw new Error("Brukeren finnes ikke");

  await setSession({
    userId: user.id,
    role: user.role,
    companyId: user.companyId,
    name: user.name,
  });

  if (user.role === "admin") redirect("/admin");
  if (user.role === "company") redirect("/utleier-admin");
  redirect("/dashboard");
}

export async function logout() {
  await clearSession();
  redirect("/");
}

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Bare admin");
  }
}

export async function approveCompany(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("companyId") ?? "");
  setCompanyStatus(id, "approved");
  revalidatePath("/admin/utleiere");
  revalidatePath("/admin");
}

export async function suspendCompany(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("companyId") ?? "");
  setCompanyStatus(id, "suspended");
  revalidatePath("/admin/utleiere");
  revalidatePath("/admin");
}

export async function reopenCompany(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("companyId") ?? "");
  setCompanyStatus(id, "approved");
  revalidatePath("/admin/utleiere");
  revalidatePath("/admin");
}

export async function suspendUser(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("userId") ?? "");
  setUserStatus(id, "suspended");
  revalidatePath("/admin/brukere");
}

export async function reactivateUser(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("userId") ?? "");
  setUserStatus(id, "active");
  revalidatePath("/admin/brukere");
}

async function requireDriver(): Promise<string> {
  const session = await getSession();
  if (!session || session.role !== "driver") {
    throw new Error("Bare innloggede sjåfører kan gjøre dette");
  }
  return session.userId;
}

export async function addFavoriteLocation(formData: FormData) {
  const userId = await requireDriver();
  const city = String(formData.get("city") ?? "").trim();
  if (!city) return;
  addDriverFavoriteLocation(userId, city);
  revalidatePath("/dashboard");
}

export async function removeFavoriteLocation(formData: FormData) {
  const userId = await requireDriver();
  const city = String(formData.get("city") ?? "").trim();
  if (!city) return;
  removeDriverFavoriteLocation(userId, city);
  revalidatePath("/dashboard");
}
