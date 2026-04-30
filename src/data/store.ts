/**
 * In-memory mutable demo store. Resets on cold deploy.
 * Replace with Supabase queries when auth + RLS is wired in.
 */

import { companies } from "./companies";
import { demoUsers } from "./users";

export type CompanyStatus = "pending" | "approved" | "suspended";
export type UserStatus = "active" | "suspended";

interface Store {
  companyStatus: Map<string, CompanyStatus>;
  userStatus: Map<string, UserStatus>;
  /** driver userId → set of normalized city names */
  driverFavoriteLocations: Map<string, Set<string>>;
}

const globalStore = globalThis as unknown as { __freeriderStore?: Store };

function init(): Store {
  const store: Store = {
    companyStatus: new Map(),
    userStatus: new Map(),
    driverFavoriteLocations: new Map(),
  };
  // First four companies approved by default; remaining pending review.
  for (const [idx, c] of companies.entries()) {
    store.companyStatus.set(c.id, idx < 4 ? "approved" : "pending");
  }
  for (const u of demoUsers) {
    store.userStatus.set(u.id, "active");
  }
  // Seed a couple drivers with sample favorites.
  store.driverFavoriteLocations.set("u-driver-ida", new Set(["Bergen", "Oslo"]));
  store.driverFavoriteLocations.set("u-driver-henrik", new Set(["Trondhjem"]));
  return store;
}

function getStore(): Store {
  if (!globalStore.__freeriderStore) {
    globalStore.__freeriderStore = init();
  }
  return globalStore.__freeriderStore;
}

export function getCompanyStatus(id: string): CompanyStatus {
  return getStore().companyStatus.get(id) ?? "pending";
}

export function setCompanyStatus(id: string, status: CompanyStatus) {
  getStore().companyStatus.set(id, status);
}

export function getUserStatus(id: string): UserStatus {
  return getStore().userStatus.get(id) ?? "active";
}

export function setUserStatus(id: string, status: UserStatus) {
  getStore().userStatus.set(id, status);
}

export function allCompanyStatuses(): Array<{ id: string; status: CompanyStatus }> {
  const store = getStore();
  return companies.map((c) => ({
    id: c.id,
    status: store.companyStatus.get(c.id) ?? "pending",
  }));
}

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
  const store = getStore();
  store.driverFavoriteLocations.get(userId)?.delete(city);
}
