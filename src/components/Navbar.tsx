"use client";

import { signOut } from "next-auth/react";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <nav className="flex h-14 sm:h-16 items-center justify-between bg-white px-4 sm:px-6 shadow-sm dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Finance Manager</div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded-md bg-red-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:bg-red-700 focus:outline-none transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
