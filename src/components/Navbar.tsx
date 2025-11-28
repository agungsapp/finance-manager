"use client";

import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between bg-white px-6 shadow-sm dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="text-xl font-bold text-gray-900 dark:text-white">Finance Manager</div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 focus:outline-none transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
