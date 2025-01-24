import { Comic_Neue, Quicksand } from "next/font/google";
import "./globals.css";
import { initializeProgress } from "./utils/gameLogic/progression";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-comic",
});

export const metadata = {
  title: "MultiTab - Les Terres des Multiplications Perdues",
  description: "Un jeu éducatif pour apprendre les tables de multiplication",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#3B82F6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#3B82F6",
  appleWebApp: {
    title: "MultiTab",
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }) {
  // Initialiser le progrès au chargement de l'application
  if (typeof window !== "undefined") {
    initializeProgress();
  }

  return (
    <html lang="fr">
      <body
        className={`${quicksand.variable} ${comicNeue.variable} font-quicksand`}
      >
        {children}
      </body>
    </html>
  );
}
