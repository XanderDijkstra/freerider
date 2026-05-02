"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUserById } from "@/data/users";
import {
  addDriverFavoriteLocation,
  addListing,
  addRequest,
  addVehicle,
  followCompany,
  getListing,
  removeDriverFavoriteLocation,
  setCompanyProfile,
  setCompanyStatus,
  setNotificationPrefs,
  setRequestStatus,
  setUserStatus,
  unfollowCompany,
} from "@/data/store";
import type { FuelType } from "./co2";
import type {
  Compensation,
  FerryPolicy,
  FuelPolicy,
  Transmission,
  VehicleType,
} from "@/data/types";
import { setSession, clearSession, getSession } from "./session";

// ===== Auth =====

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

// ===== Guards =====

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Bare admin");
  }
}

async function requireDriver(): Promise<string> {
  const session = await getSession();
  if (!session || session.role !== "driver") {
    throw new Error("Bare innloggede sjåfører kan gjøre dette");
  }
  return session.userId;
}

async function requireCompany(): Promise<string> {
  const session = await getSession();
  if (!session || session.role !== "company" || !session.companyId) {
    throw new Error("Bare innloggede utleiere kan gjøre dette");
  }
  return session.companyId;
}

// ===== Admin: companies =====

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

// ===== Admin: users =====

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

// ===== Driver: favorite locations =====

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

// ===== Driver: apply for listing =====

export async function applyForListing(formData: FormData) {
  const userId = await requireDriver();
  const listingId = String(formData.get("listingId") ?? "");
  const message = String(formData.get("message") ?? "").trim();
  const preferredPickupAt = String(formData.get("preferredPickupAt") ?? "");

  const listing = getListing(listingId);
  if (!listing) throw new Error("Annonsen finnes ikke");

  addRequest({
    driverId: userId,
    listingId,
    message,
    preferredPickupAt: preferredPickupAt || listing.pickupStart,
  });

  revalidatePath(`/biler/${listingId}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/foresp%C3%B8rsler");
  redirect("/dashboard/foresp%C3%B8rsler?sent=1");
}

// ===== Driver: follow / unfollow =====

export async function followCompanyAction(formData: FormData) {
  const userId = await requireDriver();
  const companyId = String(formData.get("companyId") ?? "");
  followCompany(userId, companyId);
  revalidatePath(`/utleier`);
  revalidatePath("/dashboard");
}

export async function unfollowCompanyAction(formData: FormData) {
  const userId = await requireDriver();
  const companyId = String(formData.get("companyId") ?? "");
  unfollowCompany(userId, companyId);
  revalidatePath(`/utleier`);
  revalidatePath("/dashboard");
}

// ===== Driver: notification prefs =====

export async function saveNotificationPrefs(formData: FormData) {
  const userId = await requireDriver();
  const keys = ["newListings", "statusChange", "pickupReminder"];
  const prefs: Record<string, { email: boolean; sms: boolean }> = {};
  for (const k of keys) {
    prefs[k] = {
      email: formData.get(`${k}_email`) === "on",
      sms: formData.get(`${k}_sms`) === "on",
    };
  }
  setNotificationPrefs(userId, prefs);
  revalidatePath("/dashboard/varsler");
  redirect("/dashboard/varsler?saved=1");
}

// ===== Company: approve / reject driver request =====

export async function approveDriverRequest(formData: FormData) {
  const companyId = await requireCompany();
  const requestId = String(formData.get("requestId") ?? "");
  const listingId = String(formData.get("listingId") ?? "");
  const listing = getListing(listingId);
  if (!listing || listing.companyId !== companyId) {
    throw new Error("Ikke din annonse");
  }
  setRequestStatus(requestId, "approved");
  revalidatePath(`/utleier-admin/annonser/${listingId}/foresp%C3%B8rsler`);
  revalidatePath("/utleier-admin");
}

export async function rejectDriverRequest(formData: FormData) {
  const companyId = await requireCompany();
  const requestId = String(formData.get("requestId") ?? "");
  const listingId = String(formData.get("listingId") ?? "");
  const listing = getListing(listingId);
  if (!listing || listing.companyId !== companyId) {
    throw new Error("Ikke din annonse");
  }
  setRequestStatus(requestId, "rejected");
  revalidatePath(`/utleier-admin/annonser/${listingId}/foresp%C3%B8rsler`);
  revalidatePath("/utleier-admin");
}

// ===== Company: profile =====

export async function saveCompanyProfile(formData: FormData) {
  const companyId = await requireCompany();
  setCompanyProfile(companyId, {
    description: String(formData.get("description") ?? "").trim(),
    contactEmail: String(formData.get("contactEmail") ?? "").trim(),
    contactPhone: String(formData.get("contactPhone") ?? "").trim(),
  });
  revalidatePath("/utleier-admin/profil");
  redirect("/utleier-admin/profil?saved=1");
}

// ===== Company: add vehicle =====

export async function addVehicleAction(formData: FormData) {
  const companyId = await requireCompany();
  const features = formData.getAll("features").map(String);
  const fuelType = String(formData.get("fuel") ?? "petrol") as FuelType;
  const transmission = String(formData.get("transmission") ?? "manual") as Transmission;

  addVehicle({
    companyId,
    plate: String(formData.get("plate") ?? "").trim(),
    make: String(formData.get("make") ?? "").trim(),
    model: String(formData.get("model") ?? "").trim(),
    year: Number(formData.get("year") ?? 2024),
    type: "sedan" as VehicleType,
    fuelType,
    transmission,
    seats: Number(formData.get("seats") ?? 5),
    luggage: 400,
    features,
    photos: ["#3A7D44"],
  });

  revalidatePath("/utleier-admin/fl%C3%A5te");
  redirect("/utleier-admin/fl%C3%A5te?added=1");
}

// ===== Company: create listing =====

export async function createListingAction(formData: FormData) {
  const companyId = await requireCompany();
  const vehicleId = String(formData.get("vehicleId") ?? "");
  const fromCity = String(formData.get("fromCity") ?? "").trim();
  const toCity = String(formData.get("toCity") ?? "").trim();
  const distanceKm = Number(formData.get("distanceKm") ?? 0);
  const pickupStart = String(formData.get("pickupStart") ?? "");
  const pickupEnd = String(formData.get("pickupEnd") ?? "");
  const dropoffDeadline = String(formData.get("dropoffDeadline") ?? "");
  const compensationKind = String(formData.get("compensation") ?? "free");

  let compensation: Compensation = { kind: "free" };
  if (compensationKind === "fuelCard") compensation = { kind: "fuelCard" };
  else if (compensationKind === "tollsAndFerries") compensation = { kind: "tollsAndFerries" };
  else if (compensationKind === "flat") {
    const amount = Number(formData.get("flatAmount") ?? 500);
    compensation = { kind: "flatNok", amount };
  }

  const listing = addListing({
    vehicleId,
    companyId,
    fromCity,
    fromAddress: fromCity,
    toCity,
    toAddress: toCity,
    distanceKm,
    maxKm: Math.round(distanceKm * 1.1),
    pickupStart: new Date(pickupStart).toISOString(),
    pickupEnd: new Date(pickupEnd).toISOString(),
    dropoffDeadline: new Date(dropoffDeadline).toISOString(),
    rules: {
      fuel: String(formData.get("fuelPolicy") ?? "returnAsReceived") as FuelPolicy,
      ferry: String(formData.get("ferryPolicy") ?? "covered") as FerryPolicy,
      tolls: "covered",
      insurance: "standard",
      minAge: 23,
      licenseClass: "B",
    },
    compensation,
    status: "published",
  });

  revalidatePath("/utleier-admin/annonser");
  revalidatePath("/biler");
  redirect(`/biler/${listing.id}`);
}
