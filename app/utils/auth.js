// utils/auth.js
export const USERS_KEY = "multiplication-users";
export const CURRENT_USER_KEY = "multiplication-current-user";

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  } catch {
    return null;
  }
};

export const addUser = (name, age) => {
  const users = getUsers();
  const newUser = {
    id: Date.now().toString(),
    name,
    age,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

export const login = (userId) => {
  const users = getUsers();
  const user = users.find((u) => u.id === userId);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
