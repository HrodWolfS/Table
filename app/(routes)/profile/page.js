"use client";

import UserAuthButton from "@/app/components/auth/UserAuthButton";
import AvatarCustomization from "@/app/components/avatar/AvatarCustomization";
import AvatarShop from "@/app/components/avatar/AvatarShop";
import { Palette, ShoppingBag } from "lucide-react";
import { useState } from "react";
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("customization");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation des onglets */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("customization")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === "customization"
                ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                : "bg-gray-900/50 text-gray-400 hover:bg-gray-800"
            }`}
          >
            <Palette size={20} />
            Personnalisation
          </button>
          <button
            onClick={() => setActiveTab("shop")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === "shop"
                ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                : "bg-gray-900/50 text-gray-400 hover:bg-gray-800"
            }`}
          >
            <ShoppingBag size={20} />
            Boutique
          </button>
        </div>
        <UserAuthButton />
        {/* Contenu de l'onglet actif */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-cyan-400/20">
          {activeTab === "customization" ? (
            <AvatarCustomization />
          ) : (
            <AvatarShop />
          )}
        </div>
      </div>
    </div>
  );
}
