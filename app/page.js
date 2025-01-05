import HomePage from "@/app/components/home/HomePage";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <HomePage />
      </main>
      <footer className="row-start-3 flex items-center justify-center gap-4 text-sm text-gray-500">
        <span>Powered by Hrodwolf</span>
      </footer>
    </div>
  );
}
