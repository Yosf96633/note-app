"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import NoteCard from "./NoteCard";
import { useNotes } from "@/state/store";

const ShowData = () => {
  const { data: session } = useSession();
  const { loading, notes, getData, resetLoading } = useNotes();
  useEffect(() => {
    if (session?.user?._id) {
      getData(session.user._id);
    }
    return () => {
      resetLoading();
    };
  }, [session?.user?._id]); 

  if (loading) {
    return (
      <div className="pt-12 md:pt-32 flex justify-center items-center">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-16">
      {notes.length === 0 ? (
        <div className="selection:bg-white selection:text-black">
          <p className="text-white text-base text-center">No notes found!</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {notes.map((note, i) => (
            <NoteCard
              userId={note.userId}
              title={note.title}
              content={note.content}
              key={i}
              _id={note._id}
              createdAt={note.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowData;
