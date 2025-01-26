"use client";

import UserAuthButton from "@/app/components/auth/UserAuthButton";
import Logo from "@/app/components/ui/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const playerName = localStorage.getItem("playerName");
    setIsAuthenticated(!!playerName);
  }, []);

  return (
    <header className="w-full p-4 mb-4 relative bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 shadow-2xl border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Logo size={32} className="text-cyan-400" />
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-800 font-comic">
                MultiTab<span className="text-cyan-400">!</span>
              </h1>
              <p className="text-xs font-medium text-gray-600 tracking-wider font-quicksand">
                Apprendre en s&apos;amusant !
              </p>
            </div>
          </div>
        </Link>

        <UserAuthButton
          setShowAuthModal={setShowAuthModal}
          isAuthenticated={isAuthenticated}
          onAuthChange={setIsAuthenticated}
        />
      </div>
    </header>
  );
}
