"use client";
import React from "react";
import { Button } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const session = useSession();
  return (
    <header className="flex items-center z-50 sticky top-0 px-4 py-2 shadow-md bg-white">
      <Button
        ripple={true}
        color="black"
        variant="outlined"
        className="h-20 min-w-[80px] border-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="text-blue-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Button>
      <div className="h-16 min-w-[64px] border-0 mr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-blue-500"
        >
          <path
            fillRule="evenodd"
            d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
            clipRule="evenodd"
          />
          <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
        </svg>
      </div>
      <h1 className="ml-2 text-2xl font-medium text-gray-700">Docs</h1>
      <div className="mx-5 lg:mx-20 focus-within:text-gray-900 focus-within:shadow-md flex-grow flex items-center rounded-lg px-5 text-gray-600 py-2 bg-gray-100">
        <div className="w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="flex flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>
      <Button
        ripple={true}
        color="black"
        variant="outlined"
        className="h-20 min-w-[80px] border-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-700"
        >
          <path
            fillRule="evenodd"
            d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 4.75zM6 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 10zm0 5.25a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM1.99 4.75a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 15.25a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1v-.01zM1.99 10a1 1 0 011-1H3a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V10z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <img loading="lazy"
      onClick={signOut}
      className="cursor-pointer h-12 w-12 rounded-full ml-2 object-cover" 
      src={session.data.user.image}
      alt=""/>
    </header>
  );
}

export default Header;
