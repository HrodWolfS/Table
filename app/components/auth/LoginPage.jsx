import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-100 to-amber-200 p-4">
      <div className="max-w-md w-full bg-white/90 rounded-lg border-2 border-amber-800/30 p-8 shadow-xl">
        <div className="text-center space-y-6">
          {/* Titre avec décoration */}
          <h1 className="text-3xl font-bold text-amber-800 relative">
            <span className="absolute left-0 right-0 top-1/2 border-b-2 border-amber-800/30 -z-10"></span>
            <span className="bg-white/90 px-4">◆ Bienvenue Aventurier ◆</span>
          </h1>

          {/* Logo ou image décorative */}
          <div className="relative w-32 h-32 mx-auto my-8">
            <Image
              src="/images/items/carte.svg"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300"
            />
          </div>

          {/* Message d'accueil */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-800/20 shadow-inner">
            <p className="text-lg text-amber-900 leading-relaxed">
              Préparez-vous à embarquer dans une aventure extraordinaire à
              travers les terres des multiplications perdues !
            </p>
          </div>

          {/* Bouton de connexion Google */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/game" })}
            className="w-full mt-8 px-8 py-4 bg-amber-800 text-white rounded-lg transform transition-all duration-200 hover:scale-105 hover:bg-amber-700 active:scale-95 shadow-lg flex items-center justify-center space-x-3"
          >
            <Image
              src="/images/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="filter brightness-0 invert"
            />
            <span>Se connecter avec Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
