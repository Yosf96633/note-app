"use client";
import React, { useState } from "react";
import { signInSchema } from "@/schemas/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import googleIcon from "../../../public/google.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
const Page = () => {
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const { email, password } = values;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "http://localhost:3000",
    });
    console.log(response);
  }
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  return (
    <div className=" min-h-screen w-screen md:grid md:place-content-center p-4 md:p-8">
      <div className="bg-[#18181B] text-white  rounded-2xl shadow-xl px-6 md:px-12 py-4 md:py-8 my-4 md:my-8 md:w-[40vw] max-md:relative max-md:top-8">
        <div className=" space-y-4 my-4">
          <h1 className="text-4xl font-bold text-center">Welcome Back</h1>
          <p className="text-center text-sm font-normal">
            Sign in to access your notes and continue where you left off.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormDescription className=" text-white">
                    We&apos;ll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className=" text-white">
                    Your password must be at least 8 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col justify-center items-center space-y-3">
              <Button
                className=" bg-white hover:bg-gray-200 text-black"
                type="submit"
              >
                Login
              </Button>
              <div className=" flex justify-center items-center space-x-1">
                <p>Create an account?</p>
                <Link className=" text-blue-500" href={`/sign-up`}>
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </Form>
        <div className=" w-full flex items-center justify-center space-x-6  my-3 md:my-6">
          <span className=" w-1/2 border-b border-gray-400 "></span>
          <p>or</p>
          <span className=" w-1/2 border-b border-gray-400 "></span>
        </div>
        <div
          onClick={async () => {
            try {
              await signIn("google", {
                redirect: true,
                callbackUrl:
                  process.env.NEXTAUTH_URL || "http://localhost:3000",
              });
            } catch (error) {
              console.error("Google Sign-In Error:", error);
            }
          }}
          className="bg-white text-black border border-black rounded-lg flex justify-center items-center p-1 space-x-2 cursor-pointer"
        >
          <span>Continue with </span>
          <Image width={1.25} height={1.25}  className="md:size-8" src={googleIcon.src} alt="google" />
        </div>
      </div>
    </div>
  );
};

export default Page;
