"use client";
import axios from "axios";
import { ObjectId } from "mongoose";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import NoteCard from "./NoteCard";

type Notes = {
  title: string;
  content: string;
  userId: ObjectId;
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
};

const ShowData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<Array<Notes>>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user._id) return;
      try {
        const response = await axios.get(`/api/get-data/${session?.user._id}`);
        if (response.data.success) {
          setNotes(response.data.notes);
          notes.reverse();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session?.user._id]);

  if (loading) {
    return (
      <div className="pt-12 md:pt-32 flex justify-center items-center">
        <LoaderCircle className=" size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-16">
      {notes.length === 0 ? (
        <div className=" selection:bg-white selection:text-black">
          <p className="text-white text-base text-center">No notes found!</p>
        </div>
      ) : (
        <div className=" grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {
          notes.map((note, i) => (
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
