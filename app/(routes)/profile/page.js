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
      <div className=" mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Link href="/">
            <div className="flex-1 flex items-center justify-start gap-1 cursor-pointer">
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
          {/* Navigation des onglets */}
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
