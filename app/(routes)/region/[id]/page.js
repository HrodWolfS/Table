"use client";
import Region from "@/app/components/game/Map/Region";
import { REGIONS } from "@/app/data/regions";
import { useParams } from "next/navigation";

export default function RegionPage() {
  const params = useParams();
  const regionId = params.id;
  const region = REGIONS[regionId];

  if (!region) {
    return <div>Région non trouvée</div>;
  }

  const regionWithId = {
    ...region,
    id: regionId,
  };

  return <Region region={regionWithId} />;
}
