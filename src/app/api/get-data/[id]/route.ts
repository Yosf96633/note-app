import connectDB from "@/lib/connectDB";
import noteModel from "@/models/note.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectDB();
    const { id } = await params;
    console.log("User ID:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }
    const notes = await noteModel.find(
      { userId: new mongoose.Types.ObjectId(id) },
      { __v: 0, updatedAt: 0 }
    );
    return Response.json({ success: true, notes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    console.log(params, "Params");
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
