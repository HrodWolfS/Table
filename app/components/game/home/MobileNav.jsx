"use client";

import { ChartBar, MapIcon, PackageOpen } from "lucide-react";
import Link from "next/link";
import UserAuthButton from "../../auth/UserAuthButton";
import Logo from "../../ui/Logo";

const MobileNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: "worldmap",
      label: "Carte du Monde",
      icon: MapIcon,
    },
    {
      id: "stats",
      label: "Statistiques",
      icon: ChartBar,
    },
    {
      id: "inventory",
      label: "Inventaire",
      icon: PackageOpen,
    },
  ];

  return (
    <>
      {/* Top bar avec Logo et User */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-indigo-900/95 backdrop-blur-sm border-b border-indigo-800 z-10">
        <Link href="/">
          <div className="flex items-center justify-center ">
            <Logo size={40} className="text-cyan-400" />
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white font-display">
                MultiTab<span className="text-cyan-400">!</span>
              </h1>
              <p className="text-xs font-medium text-gray-400 tracking-wider">
                Apprendre en s&apos;amusant !
              </p>
            </div>
          </div>
        </Link>
        <UserAuthButton />
      </div>

      {/* Bottom navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-indigo-900/95 backdrop-blur-sm border-t border-indigo-800 z-10">
        <div className="flex justify-around items-center px-4 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all
                  ${
                    activeTab === tab.id
                      ? "text-cyan-400 bg-indigo-800/50"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-indigo-800/30"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
