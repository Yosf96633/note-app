import { signUpSchema } from "@/schemas/signup";
import { NextRequest } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcryptjs"
import userModel from "@/models/user.model";
import connectDB from "@/lib/connectDB";
export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const data = await req.json();
    const result = signUpSchema.parse(data);
    const userWithEmail = await userModel.findOne({email:result.email});
    if(userWithEmail){
      return Response.json({
     success:false,
     message:`${result.email} already exists`,
      } , {
        status:400,
      })
    }
    const hashedPassword = await bcrypt.hash(result.password , 12);
    const user = await userModel.create({
      username:result.username,
      email:result.email,
      password:hashedPassword,
    })
    if(!user){
      return Response.json(
        {
          success: false,
          message: `Error while creating account`,
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: `Sign up successfully`,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return Response.json(
        {
          success: false,
          message: error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: false,
        message: `Internal server error`,
      },
      {
        status: 500,
      }
    );
  }
};
