"use client";
import { isAuthenticated } from "@/app/utils/auth";
import { useEffect, useState } from "react";
import Login from "./Login";

const AuthWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return children;
};

export default AuthWrapper;
