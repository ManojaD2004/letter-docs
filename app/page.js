"use client";
import Image from "next/image";
import Header from "./components/Header";
import { Button } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import DocumentRow from "./components/DocumentRow";

export default function Home() {
  const session = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot, setSnapshot] = useState(null);
  const userEmail = session?.data?.user?.email || null;

  useEffect(() => {
    // console.log('hi')
    if (userEmail) {
      return onSnapshot(
        query(
          collection(db, "userDocs", userEmail, "docs"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setSnapshot(snapshot.docs)
      );
    }
  }, [userEmail]);

  if (!session.data) {
    return <Login />;
  }

  async function createDocument() {
    if (!input) {
      return;
    }
    await addDoc(collection(db, "userDocs", session.data.user.email, "docs"), {
      fileName: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
    setShowModal(false);
  }

  // console.log(session.data);

  const modal = (
    <Dialog open={showModal} size="xs" handler={() => setShowModal(false)}>
      <DialogBody className="px-5 pt-5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of the document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </DialogBody>
      <DialogFooter className="flex justify-between px-4 pt-0">
        <Button
          color="blue"
          type="button"
          variant="outlined"
          onClick={() => setShowModal(false)}
          ripple={true}
        >
          Cancel
        </Button>
        <Button
          color="blue"
          type="button"
          onClick={createDocument}
          ripple={true}
        >
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );
  return (
    <main>
      <Header />
      {modal}
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg font-medium">
              Start a new document
            </h2>
            <Button
              ripple={true}
              color="black"
              variant="outlined"
              className="h-20 w-20 border-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-gray-700"
              >
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            >
              <Image
                alt=""
                src="https://links.papareact.com/pju"
                layout="fill"
              />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white md:px-0 px-10">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="font-medium flex-grow">My Document</h2>
            <p className="mr-12">Date Created</p>
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8  text-gray-700"
              >
                <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
              </svg>
            </>
          </div>
          {snapshot?.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
