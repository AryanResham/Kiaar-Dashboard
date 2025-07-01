"use client";

import { useState } from "react";

export default function Header({ darkMode, user, onUserClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      className={`$${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b px-6 py-4`}
    >
      <div className="flex items-center justify-between">
        <div className="w-14"></div>
        <nav className="hidden md:flex items-center space-x-8"></nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={onUserClick}
              className={`px-4 py-2 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } cursor-pointer`}
            >
              👤 {user.username}
            </button>
          ) : (
            <>
              <button
                className={`px-4 py-2 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                Sign in
              </button>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
