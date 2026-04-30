export type UserRole = "admin" | "company" | "driver";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  /** for role=company, the companyId they belong to */
  companyId?: string;
  licenseNumber?: string;
  createdAt: string;
}

export const demoUsers: DemoUser[] = [
  {
    id: "u-admin",
    name: "Sara Berg",
    email: "admin@freerider.no",
    phone: "+47 900 00 001",
    role: "admin",
    createdAt: "2025-09-01",
  },
  {
    id: "u-hertz-mgr",
    name: "Per Haugen",
    email: "per@hertz.no",
    phone: "+47 900 00 010",
    role: "company",
    companyId: "c-hertz",
    createdAt: "2025-10-12",
  },
  {
    id: "u-avis-mgr",
    name: "Lisa Strand",
    email: "lisa@avis.no",
    phone: "+47 900 00 020",
    role: "company",
    companyId: "c-avis",
    createdAt: "2025-11-04",
  },
  {
    id: "u-sixt-mgr",
    name: "Jan Olsen",
    email: "jan@sixt.no",
    phone: "+47 900 00 030",
    role: "company",
    companyId: "c-sixt",
    createdAt: "2026-01-09",
  },
  {
    id: "u-rentit-mgr",
    name: "Tone Lien",
    email: "tone@rent-it.no",
    phone: "+47 900 00 040",
    role: "company",
    companyId: "c-rentit",
    createdAt: "2026-04-02",
  },
  {
    id: "u-arctic-mgr",
    name: "Kari Nilsen",
    email: "kari@arcticrental.no",
    phone: "+47 900 00 050",
    role: "company",
    companyId: "c-arctic",
    createdAt: "2026-04-15",
  },
  {
    id: "u-driver-ida",
    name: "Ida Karlsen",
    email: "ida@example.com",
    phone: "+47 412 34 567",
    role: "driver",
    licenseNumber: "**** **** 1245",
    createdAt: "2025-12-04",
  },
  {
    id: "u-driver-henrik",
    name: "Henrik Bø",
    email: "henrik@example.com",
    phone: "+47 990 12 002",
    role: "driver",
    licenseNumber: "**** **** 8821",
    createdAt: "2026-01-22",
  },
  {
    id: "u-driver-marit",
    name: "Marit Engen",
    email: "marit@example.com",
    phone: "+47 916 88 200",
    role: "driver",
    licenseNumber: "**** **** 4477",
    createdAt: "2026-02-11",
  },
];

export function getUserById(id: string) {
  return demoUsers.find((u) => u.id === id);
}

export function usersByRole(role: UserRole) {
  return demoUsers.filter((u) => u.role === role);
}
