"use client";

import { Gamepad2, LogOut, SquareX, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserAuthButton({
  setShowAuthModal,
  isAuthenticated,
  onAuthChange = () => {},
}) {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const playerName = localStorage.getItem("playerName");
    if (playerName) {
      setUser({ name: playerName });
      onAuthChange?.(true);
    } else {
      setUser(null);
      onAuthChange?.(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("playerName");
    setUser(null);
    onAuthChange?.(false);
    setShowMenu(false);
    router.push("/");
  };

  if (!user) {
    return (
      <div className="absolute top-4 right-4 z-50">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center gap-3 p-2 border border-cyan-400/20 rounded-lg bg-gray-900/80 hover:bg-gray-800 transition-colors backdrop-blur-sm"
          >
            <div className="h-10 w-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
              <User className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-200">Se connecter</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 p-2 border border-cyan-400/20 rounded-lg bg-gray-900/80 hover:bg-gray-800 transition-colors backdrop-blur-sm"
        >
          <div className="h-10 w-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <User className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-200">{user.name}</p>
          </div>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg py-1 z-10 border border-cyan-400/20">
            <Link
              href="/classic"
              className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
              onClick={() => setShowMenu(false)}
            >
              <SquareX className="h-4 w-4 mr-2" />
              Mode Classique
            </Link>

            <Link
              href="/game"
              className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
              onClick={() => setShowMenu(false)}
            >
              <Gamepad2 className="h-4 w-4 mr-2" />
              Mode Aventure
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
