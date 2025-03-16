"use client";

import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          File
          <span className="text-blue-500 text-2xl"> Combine</span>
        </h1>

        <div className="flex items-center space-x-4">
          <a
            href="https://forms.gle/HkqDdHKVF97iJaDe8"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors
                       text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100
                       hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Feedback
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-110"
            aria-label="Toggle theme"
          >
            <Sun className="h-6 w-6 hidden dark:block text-orange-500" />
            <Moon className="h-6 w-6 block dark:hidden text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}