"use client";

import { CampaignMap } from "@/components/portal/CampaignMap";
import { mediumLabel } from "@/lib/format";
import type { Medium, Placement } from "@/lib/types";
import { useMemo, useState } from "react";

export function MapExplorer({ placements }: { placements: Placement[] }) {
  const [medium, setMedium] = useState<"all" | Medium>("all");
  const [neighborhood, setNeighborhood] = useState("all");

  const neighborhoods = useMemo(
    () => Array.from(new Set(placements.map((item) => item.neighborhood))).sort(),
    [placements],
  );

  const filtered = placements.filter((item) => {
    if (medium !== "all" && item.medium !== medium) return false;
    if (neighborhood !== "all" && item.neighborhood !== neighborhood) return false;
    return item.status !== "removed";
  });

  const signs = filtered.filter((item) => item.medium === "yard_sign").length;
  const hangers = filtered.filter((item) => item.medium === "door_hanger").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select value={medium} onChange={(event) => setMedium(event.target.value as "all" | Medium)} className="field max-w-48">
          <option value="all">All mediums</option>
          <option value="yard_sign">Yard signs</option>
          <option value="door_hanger">Door hangers</option>
        </select>
        <select value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} className="field max-w-64">
          <option value="all">All neighborhoods</option>
          {neighborhoods.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <p className="self-center text-sm text-slate-600">
          {signs} {mediumLabel("yard_sign").toLowerCase()}s · {hangers} {mediumLabel("door_hanger").toLowerCase()}s
        </p>
      </div>
      <div className="h-[560px] overflow-hidden rounded-3xl border border-line bg-white">
        <CampaignMap placements={filtered} className="rounded-none" />
      </div>
    </div>
  );
}
