"use client";

import { motion } from "framer-motion";
import { Award, Clock, Star, Target, Trophy, Zap } from "lucide-react";

const StatItem = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br ${color} shadow-lg `}
  >
    <div className="p-2 bg-white/20 rounded-full">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="flex flex-col">
      <span className="text-white/80 text-sm">{label}</span>
      {typeof value === "object" && value.total ? (
        <span className="text-white font-bold text-lg">
          {value.completed || value.unlocked}/{value.total}
        </span>
      ) : (
        <span className="text-white font-bold text-lg">{value}</span>
      )}
    </div>
  </motion.div>
);

const Statistics = ({ stats, userProgress }) => {
  // Calculer le nombre total de quêtes complétées
  const questsCompleted = Object.values(userProgress?.regions || {}).reduce(
    (total, region) => total + (region.completedQuests?.length || 0),
    0
  );

  // Calculer le nombre de régions débloquées
  const regionsUnlocked = {
    unlocked: userProgress?.unlockedRegions?.length || 1,
    total: 10,
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
    >
      <StatItem
        icon={Trophy}
        label="Score Total"
        value={stats.totalScore || 0}
        color="from-amber-500 to-amber-700"
      />
      <StatItem
        icon={Star}
        label="XP Total"
        value={stats.totalXP || 0}
        color="from-purple-500 to-purple-700"
      />
      <StatItem
        icon={Zap}
        label="Pièces"
        value={stats.totalCoins || 0}
        color="from-yellow-500 to-yellow-700"
      />
      <StatItem
        icon={Clock}
        label="Temps de jeu"
        value={`${Math.floor((stats.timeSpent || 0) / 60)}min ${Math.floor(
          (stats.timeSpent || 0) % 60
        )}s`}
        color="from-blue-500 to-blue-700"
      />
      <StatItem
        icon={Target}
        label="Quêtes complétées"
        value={questsCompleted}
        color="from-green-500 to-green-700"
      />
      <StatItem
        icon={Award}
        label="Régions débloquées"
        value={regionsUnlocked}
        color="from-rose-500 to-rose-700"
      />
    </motion.div>
  );
};

export default Statistics;
