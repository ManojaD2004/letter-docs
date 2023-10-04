import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
    >
      <Button
        ripple={true}
        color="black"
        variant="outlined"
        className="h-10 w-7 border-0 text-blue-500 relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        >
          <path
            fillRule="evenodd"
            d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
            clipRule="evenodd"
          />
          <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
        </svg>
      </Button>
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="text-sm pr-5">{date?.toDate().toLocaleDateString()}</p>
      <Button
        ripple={true}
        color="black"
        variant="outlined"
        className="h-10 w-7 border-0 relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-700 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
        >
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        </svg>
      </Button>
    </div>
  );
}

export default DocumentRow;
