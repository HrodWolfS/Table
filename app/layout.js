import { Footer } from "./components/home/Footer";
import Header from "./components/home/Header";
import "./globals.css";

export const metadata = {
  title: "MultiTab",
  description: "Apprendre les tables de multiplication en s'amusant !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
