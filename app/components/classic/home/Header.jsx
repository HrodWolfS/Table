"use client";
import { getCurrentUser, logout } from "@/app/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import UserAuthButton from "../../auth/UserAuthButton";
import Logo from "../../ui/Logo";

const USER_KEY = "multiTabUser";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Vérifier l'utilisateur au chargement
    const checkUser = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    checkUser();

    // Ajouter un écouteur pour les changements de localStorage
    const handleStorageChange = (e) => {
      if (e.key === "playerName" || e.key === USER_KEY) {
        checkUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Fermer le menu si on clique en dehors
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="shadow-sm border-b border-white/20 w-full p-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <div className=" mx-auto">
        <div className=" flex justify-between items-center">
          {/* Logo et titre */}
          <Link href="/">
            <div className="flex-1 flex items-center justify-start gap-1 cursor-pointer">
              <Logo size={48} className="text-yellow-500" />
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-display">
                  MultiTab
                  <span className="text-yellow-400">!</span>
                </h1>
                <p className="text-xs md:text-sm font-medium text-white tracking-wide">
                  Apprendre en s'amusant !
                </p>
              </div>
            </div>
          </Link>
        </div>
        <UserAuthButton setShowAuthModal={setShowAuthModal} />
      </div>
    </header>
  );
};

export default Header;
