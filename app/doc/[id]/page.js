"use client";
import Login from "@/app/components/Login";
import TextEditor from "@/app/components/TextEditor";
import { db } from "@/firebase/firebase";
import { Button } from "@material-tailwind/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Doc({ params }) {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState(null);
  const session = useSession();
  const userEmail = session?.data?.user?.email || null;
  const docId = params.id;
  useEffect(() => {
    if (userEmail && docId) {
      // console.log("1");
      return onSnapshot(
        doc(db, "userDocs", userEmail, "docs", docId),

        (snapshot) => setSnapshot(snapshot.data())
      );
    }
  }, [docId, userEmail]);

  if (!session.data) {
    <Login />;
  }

  if (snapshot && !snapshot?.fileName) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <div
          onClick={() => router.push("/")}
          className="h-16 min-w-[32px] border-0 mr-3 hover:cursor-pointer"
        >
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
        <div className="flex-grow px-2 ">
          <h2>{snapshot?.fileName}</h2>
          <div className="flex items-center flex-row text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button
          ripple={true}
          color="blue"
          variant="filled"
          className="h-10 md:!inline-flex hidden items-center justify-evenly space-x-1 border-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
          </svg>
          <p>Share</p>
        </Button>
        <img
          className="rounded-full cursor-pointer h-10 w-10 ml-2"
          alt=""
          src={session?.data?.user?.image}
        />
      </header>
      <TextEditor docId={docId} userEmail={userEmail} />
    </div>
  );
}

export default Doc;
