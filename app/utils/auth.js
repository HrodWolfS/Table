// utils/auth.js
const USER_KEY = "multiTabUser";

export const saveUser = (user) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem(USER_KEY);
    const playerName = localStorage.getItem("playerName");
    if (playerName) {
      return { name: playerName };
    }
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("playerName");
  // Optionnel : supprimer aussi la progression
  localStorage.removeItem("multiTabProgress");
  window.location.reload();
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  const playerName = localStorage.getItem("playerName");
  return !!user || !!playerName;
};
