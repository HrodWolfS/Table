"use client";
import { getCurrentUser, logout } from "@/app/utils/auth";
import { LogOut, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "../ui/Logo";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Fermer le menu si on clique en dehors
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="mb-8 shadow-sm p-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="h-20 flex justify-between items-center">
          {/* Logo et titre */}
          <Link href="/">
            <div className="flex-1 flex items-center justify-start gap-3 cursor-pointer">
              <Logo size={48} />
              <div>
                <h1 className="text-4xl font-black tracking-tight text-gray-900 font-display">
                  MultiTab
                  <span className="text-blue-600">.</span>
                </h1>
                <p className="text-sm font-medium text-gray-500 tracking-wide">
                  Apprendre en s'amusant !
                </p>
              </div>
            </div>
          </Link>

          {/* Profil avec menu déroulant */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.age} ans</p>
                </div>
              </button>

              {/* Menu déroulant */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
