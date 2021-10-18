import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col flex-1">
        <header className="z-10 flex justify-between py-4 px-4 bg-white shadow-md dark:bg-gray-800">
          <Link to="/">IPL APP</Link>
          <Link
            to="/add-player"
            class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Add Player
          </Link>
        </header>
        <main className="h-full py-4 overflow-y-auto">
          <div className="container px-6 mx-auto grid">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
