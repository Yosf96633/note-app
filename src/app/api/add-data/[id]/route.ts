import connectDB from "@/lib/connectDB";
import noteModel from "@/models/note.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }:  { params : Promise<{id:string}>}
) => {
  try {
   await connectDB();
    const { title, content } = await req.json();
    const {id} = await params; // ✅ Correct way to access `id`

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid user ID" }, { status: 400 });
    }

    const note = await noteModel.create({
      userId: new mongoose.Types.ObjectId(id),
      title,
      content,
    });
    return NextResponse.json({ success: true, message: "Note created!", note }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};

