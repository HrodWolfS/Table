"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "./components/auth/AuthModal";
import UserAuthButton from "./components/auth/UserAuthButton";
import { Footer } from "./components/game/home/Footer";
import Logo from "./components/ui/Logo";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intendedPath, setIntendedPath] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const playerName = localStorage.getItem("playerName");
    setIsAuthenticated(!!playerName);
  }, []);

  const handleModeClick = (path) => (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIntendedPath(path);
      setShowAuthModal(true);
    } else {
      router.push(path);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    if (intendedPath) {
      router.push(intendedPath);
    }
  };

  return (
    <div className="flex flex-grow bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 relative overflow-hidden">
        {/* Effet de grille futuriste */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <UserAuthButton
          setShowAuthModal={setShowAuthModal}
          isAuthenticated={isAuthenticated}
          onAuthChange={setIsAuthenticated}
        />

        <Link href="/">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
            <Logo size={56} className="text-cyan-400" />
            <div>
              <h1 className="text-4xl md:text-4xl font-black tracking-tight text-white font-display">
                MultiTab
                <span className="text-cyan-400">!</span>
              </h1>
              <p className="text-sm md:text-sm font-medium text-gray-400 tracking-wider">
                Apprendre en s&apos;amusant !
              </p>
            </div>
          </div>
        </Link>

        <div className="relative flex flex-grow flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-display mb-4">
            Bienvenue dans le Monde des Multiplications
            <span className="text-cyan-400">!</span>
          </h1>
          <p className="text-lg mb-12 text-gray-400 font-medium tracking-wide text-center">
            Choisissez un mode pour débuter votre apprentissage :
          </p>

          <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full">
            {/* Mode Classique */}
            <a
              onClick={handleModeClick("/classic")}
              className="flex-1 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-2xl p-8 shadow-xl hover:scale-105 transition-all duration-300 h-full text-center border border-white/20 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Mode Classique
                </h2>
                <p className="text-white font-medium">
                  Entraînez-vous librement avec les tables. Visualisez vos
                  progrès et devenez plus fort à votre rythme.
                </p>
              </div>
            </a>

            {/* Mode Aventure */}
            <a
              onClick={handleModeClick("/game")}
              className="flex-1 cursor-pointer"
            >
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-xl hover:scale-105 transition-all duration-300 h-full text-center border border-indigo-700 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Mode Aventure
                </h2>
                <p className="text-white font-medium">
                  Explorez un monde fantastique, relevez des missions, et
                  débloquez des artefacts en maîtrisant vos tables !
                </p>
              </div>
            </a>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />

        <Footer />
      </div>
    </div>
  );
}
