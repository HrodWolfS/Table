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
      const playerName = localStorage.getItem("playerName");

      if (path === "/game") {
        const hasStartedAdventure = localStorage.getItem(
          `${playerName}_hasStartedAdventure`
        );
        if (!hasStartedAdventure) {
          localStorage.setItem(`${playerName}_hasStartedAdventure`, "true");
          router.push("/game?showIntro=true");
          return;
        }
      }
      router.push(path);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    if (intendedPath) {
      const playerName = localStorage.getItem("playerName");

      if (intendedPath === "/game") {
        const hasStartedAdventure = localStorage.getItem(
          `${playerName}_hasStartedAdventure`
        );
        if (!hasStartedAdventure) {
          localStorage.setItem(`${playerName}_hasStartedAdventure`, "true");
          router.push("/game?showIntro=true");
          return;
        }
      }
      router.push(intendedPath);
    }
  };

  return (
    <div className="flex flex-grow bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-between min-h-screen w-full p-4 relative overflow-hidden">
        {/* Grille de fond */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* En-tête avec authentification et logo */}
        <div className="w-full relative z-20">
          <div className="absolute top-0 right-4">
            <UserAuthButton
              setShowAuthModal={setShowAuthModal}
              isAuthenticated={isAuthenticated}
              onAuthChange={setIsAuthenticated}
            />
          </div>

          <Link href="/">
            <div className="flex items-center justify-center gap-2 pt-16 sm:pt-8">
              <Logo size={40} className="text-cyan-400" />
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white font-comic">
                  MultiTab<span className="text-cyan-400">!</span>
                </h1>
                <p className="text-xs font-medium text-gray-400 tracking-wider font-quicksand">
                  Apprendre en s&apos;amusant !
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto px-4 py-8 relative z-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-comic mb-4 text-center">
            Bienvenue dans le Monde des Multiplications
            <span className="text-cyan-400">!</span>
          </h1>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 text-gray-400 font-medium tracking-wide text-center px-4 font-quicksand">
            Choisissez un mode pour débuter votre apprentissage :
          </p>

          <div className="flex flex-col gap-4 sm:gap-8 w-full">
            {/* Mode Classique */}
            <a
              onClick={handleModeClick("/classic")}
              className="w-full cursor-pointer"
            >
              <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl hover:scale-105 transition-all duration-300 text-center border border-white/20 backdrop-blur-sm">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white font-comic">
                  Mode Classique
                </h2>
                <p className="text-sm sm:text-base text-white font-medium font-quicksand">
                  Entraînez-vous librement avec les tables. Visualisez vos
                  progrès et devenez plus fort à votre rythme.
                </p>
              </div>
            </a>

            {/* Mode Aventure */}
            <a
              onClick={handleModeClick("/game")}
              className="w-full cursor-pointer"
            >
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl hover:scale-105 transition-all duration-300 text-center border border-indigo-700 backdrop-blur-sm">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white font-comic">
                  Mode Aventure
                </h2>
                <p className="text-sm sm:text-base text-white font-medium font-quicksand">
                  Explorez un monde fantastique, relevez des missions, et
                  débloquez des artefacts en maîtrisant vos tables !
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Modal et Footer */}
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
