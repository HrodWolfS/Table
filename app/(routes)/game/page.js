"use client";

import GamePage from "@/app/components/game/home/GamePage";
import { Suspense } from "react";

export default function Game() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <GamePage />
    </Suspense>
  );
}
