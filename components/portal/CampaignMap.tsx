"use client";

import { useEffect, useRef } from "react";
import type { Placement } from "@/lib/types";
import { mediumLabel } from "@/lib/format";

type CampaignMapProps = {
  placements: Placement[];
  className?: string;
};

export function CampaignMap({ placements, className = "" }: CampaignMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    async function setup() {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const center = placements[0]
        ? ([placements[0].lat, placements[0].lng] as [number, number])
        : ([39.7392, -104.9903] as [number, number]);

      map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(center, 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      const markers = placements.map((placement) => {
        const icon = L.divIcon({
          className: "",
          html: `<div class="ss-marker ${placement.medium === "yard_sign" ? "ss-marker-sign" : "ss-marker-hanger"}">${
            placement.medium === "yard_sign" ? "S" : "H"
          }</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        return L.marker([placement.lat, placement.lng], { icon }).bindPopup(
          `<strong>${mediumLabel(placement.medium)}</strong><br/>${placement.neighborhood}<br/>${placement.address}<br/>${placement.status}`,
        );
      });

      const group = L.featureGroup(markers).addTo(map);
      if (placements.length > 1) {
        map.fitBounds(group.getBounds().pad(0.12));
      }
    }

    void setup();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [placements]);

  return <div ref={containerRef} className={`h-full min-h-[360px] w-full overflow-hidden rounded-3xl ${className}`} />;
}
