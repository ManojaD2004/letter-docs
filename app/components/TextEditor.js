import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import dynamic from "next/dynamic";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useSession } from "next-auth/react";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

function TextEditor({ docId, userEmail }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    //   console.log("1");
    if (docId && userEmail) {
      // console.log(userEmail, docId);
      return onSnapshot(
        doc(db, "userDocs", userEmail, "docs", docId),
        (snapshot) => setSnapshot(snapshot)
      );
    }
  }, [docId, userEmail]);

  useEffect(() => {
    if (snapshot?.data().editorStateData) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data().editorStateData)
        )
      );
    }
  }, [snapshot]);

  async function onEditorStateChange(editorState) {
    setEditorState(editorState);
    await setDoc(
      doc(db, "userDocs", userEmail, "docs", docId),
      { editorStateData: convertToRaw(editorState.getCurrentContent()) },
      { merge: true }
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16 ">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
      />
    </div>
  );
}

export default TextEditor;
