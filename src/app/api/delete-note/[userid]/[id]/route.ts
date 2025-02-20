import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import noteModel from "@/models/note.model";
import mongoose from "mongoose";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string; id: string }> }
) {
  await connectDB(); // Ensure DB is connected

  console.log("Params:", params); // Debugging
  const { userid, id } = await params;

  if (!userid || !id) {
    return NextResponse.json(
      { success: false, message: "Invalid path parameters" },
      { status: 400 }
    );
  }

  try {
    const result = await noteModel.findOneAndDelete({
      userId: new mongoose.Types.ObjectId(userid),
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
