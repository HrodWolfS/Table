"use client";

import UserAuthButton from "@/app/components/auth/UserAuthButton";
import AvatarCustomization from "@/app/components/avatar/AvatarCustomization";
import AvatarShop from "@/app/components/avatar/AvatarShop";
import Logo from "@/app/components/ui/Logo";
import { Palette, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("customization");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link href="/">
            <div className="flex items-center gap-1 cursor-pointer">
              <Logo size={48} className="text-yellow-500" />
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-display">
                  MultiTab
                  <span className="text-yellow-400">!</span>
                </h1>
                <p className="text-xs md:text-sm font-medium text-white tracking-wide">
                  Apprendre en s&apos;amusant !
                </p>
              </div>
            </div>
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Navigation des onglets */}
            <div className="flex w-full sm:w-auto gap-2">
              <button
                onClick={() => setActiveTab("customization")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all ${
                  activeTab === "customization"
                    ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                    : "bg-gray-900/50 text-gray-400 hover:bg-gray-800"
                }`}
              >
                <Palette size={20} className="hidden sm:block" />
                <span className="text-sm sm:text-base">Personnalisation</span>
              </button>
              <button
                onClick={() => setActiveTab("shop")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all ${
                  activeTab === "shop"
                    ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                    : "bg-gray-900/50 text-gray-400 hover:bg-gray-800"
                }`}
              >
                <ShoppingBag size={20} className="hidden sm:block" />
                <span className="text-sm sm:text-base">Boutique</span>
              </button>
            </div>
            <UserAuthButton />
          </div>
        </div>

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
