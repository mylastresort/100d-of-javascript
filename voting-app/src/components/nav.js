import React from "react";

export default () => {
  return (
    <nav>
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/*
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            */}
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              {/*
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            */}
              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="grid items-center grid-cols-2 gap-1 text-white cursor-pointer">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <div>
                V<b>A</b>
              </div>
            </div>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex space-x-4 text-center">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a
                  href="#"
                  className="px-3 py-2 font-medium text-white rounded-md"
                >
                  <div>QUIZ</div>
                  <div className="text-xs">MAKER</div>
                </a>
                <a
                  href="#"
                  className="px-3 py-2 font-medium text-gray-300 rounded-md hover:text-white"
                >
                  <div>SURVEY</div>
                  <div className="text-xs">MAKER</div>
                </a>
                <a
                  href="#"
                  className="px-3 py-2 font-medium text-gray-300 rounded-md hover:text-white"
                >
                  <div>HELP</div>
                  <div className="text-xs">&#38; GUIDES</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
      Mobile menu, toggle classes based on menu state.

      Menu open: "block", Menu closed: "hidden"
    */}
      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="px-3 py-2 font-medium text-white rounded-md">
            <div>QUIZ</div>
            <div className="text-xs">MAKER</div>
          </a>
          <a
            href="#"
            className="px-3 py-2 font-medium text-gray-300 rounded-md hover:text-white"
          >
            <div>SURVEY</div>
            <div className="text-xs">MAKER</div>
          </a>
          <a
            href="#"
            className="px-3 py-2 font-medium text-gray-300 rounded-md hover:text-white"
          >
            <div>HELP</div>
            <div className="text-xs">&#38; GUIDES</div>
          </a>
        </div>
      </div>
    </nav>
  );
};