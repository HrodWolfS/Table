"use client";

import { ChartBar, MapIcon, PackageOpen } from "lucide-react";
import Link from "next/link";
import UserAuthButton from "../../auth/UserAuthButton";
import Logo from "../../ui/Logo";

const DesktopNav = ({ activeTab, onTabChange }) => {
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
    <div className="hidden sm:block fixed top-0 left-0 right-0 bg-indigo-900/95 backdrop-blur-sm border-b border-indigo-800 z-10">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <Logo size={40} className="text-cyan-400" />
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white font-display">
                MultiTab<span className="text-cyan-400">!</span>
              </h1>
              <p className="text-xs font-medium text-gray-400 tracking-wider">
                Apprendre en s&apos;amusant !
              </p>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all
                  ${
                    activeTab === tab.id
                      ? "text-cyan-400 bg-indigo-800/50"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-indigo-800/30"
                  }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-shrink-0">
          <UserAuthButton />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
