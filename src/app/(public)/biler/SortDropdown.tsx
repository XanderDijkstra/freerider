"use client";

interface SearchParams {
  from?: string;
  to?: string;
  fuelType?: string;
  type?: string;
  q?: string;
  sort?: string;
}

const options = [
  { value: "newest", label: "Nyeste" },
  { value: "distance", label: "Kortast distanse" },
  { value: "co2", label: "Mest CO₂ spart" },
];

const inputClass =
  "block h-9 w-44 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export function SortDropdown({
  current,
  params,
}: {
  current?: string;
  params: SearchParams;
}) {
  return (
    <form action="/biler" method="get" className="flex items-center gap-2">
      {Object.entries(params).map(([k, v]) =>
        k === "sort" || !v ? null : (
          <input key={k} type="hidden" name={k} value={v} />
        ),
      )}
      <label className="text-sm text-[color:var(--muted)]">Sorter</label>
      <select
        name="sort"
        defaultValue={current ?? "newest"}
        onChange={(e) => e.currentTarget.form?.submit()}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  );
}
