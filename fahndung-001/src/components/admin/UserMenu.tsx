"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

export default function UserMenu() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const update = () => {
      setLoggedIn(Boolean(localStorage.getItem("demo-session")));
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("demo-session-changed", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("demo-session-changed", update);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("demo-session");
    window.dispatchEvent(new Event("demo-session-changed"));
    location.href = "/";
  }

  if (!loggedIn) {
    return (
      <Link href="/login" className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4" /> Login
      </Link>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-red-600 hover:underline"
    >
      <LogOut className="h-4 w-4" /> Logout
    </button>
  );
}
