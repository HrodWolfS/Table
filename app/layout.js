import { Inter } from "next/font/google";
import "./globals.css";
import { initializeProgress } from "./utils/gameLogic/progression";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MultiTab - Les Terres des Multiplications Perdues",
  description: "Un jeu éducatif pour apprendre les tables de multiplication",
};

export default function RootLayout({ children }) {
  // Initialiser le progrès au chargement de l'application
  if (typeof window !== "undefined") {
    initializeProgress();
  }

  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
