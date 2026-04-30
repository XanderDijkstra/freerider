const OSLO_TZ = "Europe/Oslo";

export function formatDate(input: Date | string): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: OSLO_TZ,
  }).format(d);
}

export function formatDateRange(
  start: Date | string,
  end: Date | string,
): string {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function formatTime(input: Date | string): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: OSLO_TZ,
  }).format(d);
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("nb-NO").format(Math.round(km))} km`;
}

export function formatKg(kg: number): string {
  return `${new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(kg)} kg`;
}

export function formatNok(amount: number): string {
  const formatted = new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} kr`;
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value);
}

export function pluralKm(km: number): string {
  return formatKm(km);
}
