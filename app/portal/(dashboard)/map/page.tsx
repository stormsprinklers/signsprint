import { MapExplorer } from "@/components/portal/MapExplorer";
import { placements } from "@/lib/data";

export const metadata = { title: "Live map" };

export default function MapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy">Live placement map</h1>
        <p className="mt-1 text-slate-600">
          Yard signs show as blue dots (S). Door hanger routes show as cyan markers (H). Filter by medium or neighborhood.
        </p>
      </div>
      <MapExplorer placements={placements} />
    </div>
  );
}
