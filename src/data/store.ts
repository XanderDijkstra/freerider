/**
 * In-memory mutable demo store. Resets on cold deploy.
 * Replace with Supabase queries when auth + RLS is wired in.
 */

import { companies as seedCompanies } from "./companies";
import { demoUsers } from "./users";
import { vehicles as seedVehicles } from "./vehicles";
import { listings as seedListings } from "./listings";
import type {
  Company,
  Listing,
  Vehicle,
} from "./types";

export type CompanyStatus = "pending" | "approved" | "suspended";
export type UserStatus = "active" | "suspended";
export type RequestStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface DriverRequest {
  id: string;
  driverId: string;
  listingId: string;
  status: RequestStatus;
  message: string;
  preferredPickupAt: string;
  createdAt: string;
  decidedAt?: string;
}

export interface CompanyProfile {
  description: string;
  contactEmail: string;
  contactPhone: string;
}

interface Store {
  companyStatus: Map<string, CompanyStatus>;
  userStatus: Map<string, UserStatus>;
  driverFavoriteLocations: Map<string, Set<string>>;
  requests: DriverRequest[];
  follows: Set<string>; // "driverId|companyId"
  vehicles: Vehicle[];
  listings: Listing[];
  companyProfiles: Map<string, CompanyProfile>;
  notificationPrefs: Map<string, Record<string, { email: boolean; sms: boolean }>>;
}

const globalStore = globalThis as unknown as { __freeriderStore?: Store };

function init(): Store {
  const store: Store = {
    companyStatus: new Map(),
    userStatus: new Map(),
    driverFavoriteLocations: new Map(),
    requests: [],
    follows: new Set(),
    vehicles: [...seedVehicles],
    listings: [...seedListings],
    companyProfiles: new Map(),
    notificationPrefs: new Map(),
  };
  for (const [idx, c] of seedCompanies.entries()) {
    store.companyStatus.set(c.id, idx < 4 ? "approved" : "pending");
    store.companyProfiles.set(c.id, {
      description: c.description,
      contactEmail: `kontakt@${c.slug}.no`,
      contactPhone: "+47 21 00 00 00",
    });
  }
  for (const u of demoUsers) {
    store.userStatus.set(u.id, "active");
  }
  store.driverFavoriteLocations.set("u-driver-ida", new Set(["Bergen", "Oslo"]));
  store.driverFavoriteLocations.set("u-driver-henrik", new Set(["Trondhjem"]));

  // Seed a few demo requests so admin and dashboards have something to show.
  const now = new Date().toISOString();
  store.requests.push(
    {
      id: "r-seed-1",
      driverId: "u-driver-ida",
      listingId: "l-001",
      status: "approved",
      message: "Skal til Bergen for en konferanse, kan hente tidlig.",
      preferredPickupAt: "2026-05-03T09:00:00Z",
      createdAt: now,
      decidedAt: now,
    },
    {
      id: "r-seed-2",
      driverId: "u-driver-ida",
      listingId: "l-005",
      status: "pending",
      message: "Fleksibel på opphenting.",
      preferredPickupAt: "2026-05-04T10:00:00Z",
      createdAt: now,
    },
    {
      id: "r-seed-3",
      driverId: "u-driver-henrik",
      listingId: "l-001",
      status: "pending",
      message: "Erfaren med ID.4. Kan hente når som helst i vinduet.",
      preferredPickupAt: "2026-05-03T14:00:00Z",
      createdAt: now,
    },
    {
      id: "r-seed-4",
      driverId: "u-driver-marit",
      listingId: "l-009",
      status: "pending",
      message: "",
      preferredPickupAt: "2026-05-04T11:00:00Z",
      createdAt: now,
    },
  );

  store.follows.add("u-driver-ida|c-hertz");
  store.follows.add("u-driver-henrik|c-sixt");

  return store;
}

function getStore(): Store {
  if (!globalStore.__freeriderStore) {
    globalStore.__freeriderStore = init();
  }
  return globalStore.__freeriderStore;
}

// ---------- Company status ----------

export function getCompanyStatus(id: string): CompanyStatus {
  return getStore().companyStatus.get(id) ?? "pending";
}
export function setCompanyStatus(id: string, status: CompanyStatus) {
  getStore().companyStatus.set(id, status);
}
export function allCompanyStatuses(): Array<{ id: string; status: CompanyStatus }> {
  const s = getStore();
  return seedCompanies.map((c) => ({
    id: c.id,
    status: s.companyStatus.get(c.id) ?? "pending",
  }));
}

// ---------- User status ----------

export function getUserStatus(id: string): UserStatus {
  return getStore().userStatus.get(id) ?? "active";
}
export function setUserStatus(id: string, status: UserStatus) {
  getStore().userStatus.set(id, status);
}

// ---------- Favorite locations ----------

export function getDriverFavoriteLocations(userId: string): string[] {
  const set = getStore().driverFavoriteLocations.get(userId);
  if (!set) return [];
  return Array.from(set).sort((a, b) => a.localeCompare(b, "nb"));
}
export function addDriverFavoriteLocation(userId: string, city: string) {
  const store = getStore();
  const trimmed = city.trim();
  if (!trimmed) return;
  if (!store.driverFavoriteLocations.has(userId)) {
    store.driverFavoriteLocations.set(userId, new Set());
  }
  store.driverFavoriteLocations.get(userId)!.add(trimmed);
}
export function removeDriverFavoriteLocation(userId: string, city: string) {
  getStore().driverFavoriteLocations.get(userId)?.delete(city);
}

// ---------- Driver requests ----------

export function getRequestsForDriver(driverId: string): DriverRequest[] {
  return getStore()
    .requests.filter((r) => r.driverId === driverId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
export function getRequestsForListing(listingId: string): DriverRequest[] {
  return getStore()
    .requests.filter((r) => r.listingId === listingId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
export function getRequestsForCompany(companyId: string): DriverRequest[] {
  const listingIds = new Set(
    getStore()
      .listings.filter((l) => l.companyId === companyId)
      .map((l) => l.id),
  );
  return getStore().requests.filter((r) => listingIds.has(r.listingId));
}
export function addRequest(req: Omit<DriverRequest, "id" | "createdAt" | "status">): DriverRequest {
  const store = getStore();
  // Prevent duplicate pending application from same driver to same listing.
  const existing = store.requests.find(
    (r) =>
      r.driverId === req.driverId &&
      r.listingId === req.listingId &&
      (r.status === "pending" || r.status === "approved"),
  );
  if (existing) return existing;
  const created: DriverRequest = {
    ...req,
    id: `r-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  store.requests.push(created);
  return created;
}
export function setRequestStatus(id: string, status: RequestStatus) {
  const store = getStore();
  const r = store.requests.find((x) => x.id === id);
  if (!r) return;
  r.status = status;
  r.decidedAt = new Date().toISOString();
  // When approving, auto-reject other pending requests for same listing.
  if (status === "approved") {
    for (const other of store.requests) {
      if (
        other.id !== id &&
        other.listingId === r.listingId &&
        other.status === "pending"
      ) {
        other.status = "rejected";
        other.decidedAt = new Date().toISOString();
      }
    }
  }
}

// ---------- Follows ----------

function followKey(driverId: string, companyId: string) {
  return `${driverId}|${companyId}`;
}
export function isFollowing(driverId: string, companyId: string): boolean {
  return getStore().follows.has(followKey(driverId, companyId));
}
export function followCompany(driverId: string, companyId: string) {
  getStore().follows.add(followKey(driverId, companyId));
}
export function unfollowCompany(driverId: string, companyId: string) {
  getStore().follows.delete(followKey(driverId, companyId));
}
export function getFollowedCompanyIds(driverId: string): string[] {
  const prefix = `${driverId}|`;
  return Array.from(getStore().follows)
    .filter((k) => k.startsWith(prefix))
    .map((k) => k.slice(prefix.length));
}

// ---------- Vehicles ----------

export function listVehicles(): Vehicle[] {
  return getStore().vehicles;
}
export function getVehicle(id: string): Vehicle | undefined {
  return getStore().vehicles.find((v) => v.id === id);
}
export function vehiclesForCompany(companyId: string): Vehicle[] {
  return getStore().vehicles.filter((v) => v.companyId === companyId);
}
export function addVehicle(v: Omit<Vehicle, "id">): Vehicle {
  const store = getStore();
  const created: Vehicle = {
    ...v,
    id: `v-${Math.random().toString(36).slice(2, 9)}`,
  };
  store.vehicles.push(created);
  return created;
}

// ---------- Listings ----------

export function listListings(): Listing[] {
  return getStore().listings;
}
export function listingsForCompany(companyId: string): Listing[] {
  return getStore().listings.filter(
    (l) => l.companyId === companyId && l.status === "published",
  );
}
export function getListing(id: string): Listing | undefined {
  return getStore().listings.find((l) => l.id === id);
}
export function publishedListingsLive(): Listing[] {
  return getStore().listings.filter((l) => l.status === "published");
}
export function relatedListingsLive(listing: Listing, count = 4): Listing[] {
  return publishedListingsLive()
    .filter((l) => l.id !== listing.id)
    .sort((a, b) => {
      const aScore =
        (a.companyId === listing.companyId ? 2 : 0) +
        (a.fromCity === listing.fromCity ? 1 : 0) +
        (a.toCity === listing.toCity ? 1 : 0);
      const bScore =
        (b.companyId === listing.companyId ? 2 : 0) +
        (b.fromCity === listing.fromCity ? 1 : 0) +
        (b.toCity === listing.toCity ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, count);
}

export function addListing(l: Omit<Listing, "id" | "publishedAt">): Listing {
  const store = getStore();
  const created: Listing = {
    ...l,
    id: `l-${Math.random().toString(36).slice(2, 9)}`,
    publishedAt: new Date().toISOString(),
  };
  store.listings.push(created);
  return created;
}

// ---------- Company profile ----------

export function getCompanyProfile(id: string): CompanyProfile | undefined {
  return getStore().companyProfiles.get(id);
}
export function setCompanyProfile(id: string, profile: CompanyProfile) {
  getStore().companyProfiles.set(id, profile);
}
export function getCompanyWithProfile(c: Company): Company & {
  contactEmail: string;
  contactPhone: string;
} {
  const profile = getStore().companyProfiles.get(c.id);
  return {
    ...c,
    description: profile?.description ?? c.description,
    contactEmail: profile?.contactEmail ?? `kontakt@${c.slug}.no`,
    contactPhone: profile?.contactPhone ?? "+47 21 00 00 00",
  };
}

// ---------- Notification prefs ----------

export function getNotificationPrefs(userId: string): Record<string, { email: boolean; sms: boolean }> {
  return getStore().notificationPrefs.get(userId) ?? {
    newListings: { email: true, sms: false },
    statusChange: { email: true, sms: true },
    pickupReminder: { email: true, sms: true },
  };
}
export function setNotificationPrefs(
  userId: string,
  prefs: Record<string, { email: boolean; sms: boolean }>,
) {
  getStore().notificationPrefs.set(userId, prefs);
}
