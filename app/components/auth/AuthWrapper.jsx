"use client";

import { getCurrentUser } from "@/app/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname]);

  return children;
}
