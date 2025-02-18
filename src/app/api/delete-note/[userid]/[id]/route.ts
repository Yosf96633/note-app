import noteModel from "@/models/note.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
export async function DELETE(
  { params }: { params: Promise<{ userid: string; id: string }> }
) {
  try {
    const { userid, id } = await params;
    if (!userid || !id) {
      return Response.json(
        { success: true, message: `Invalid path parameters` },
        {
          status: 400,
        }
      );
    }
    const result = await noteModel.findOneAndDelete({
      userId: new mongoose.Types.ObjectId(userid),
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!result) {
      return Response.json(
        { success: false, message: `Did not found result` },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      { success: true, message: `Note deleted successfully` },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: `Internal server error` },
      {
        status: 500,
      }
    );
  }
}
