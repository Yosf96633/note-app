"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signup";
import googleIcon from "../../../public/google.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      const response = await axios.post(`/api/sign-up`, values);
      if (response.data.success) {
        toast({
          title: `Congratulations`,
          description: response.data.message,
          variant: "default",
        });
      }
      router.push(`/sign-in`);
    } catch (error: any) {
      console.log(error);

      toast({
        title: `Error`,
        description: error.response?.data.message || `Something went wrong`,
        variant: "destructive",
      });
    }
  }
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className=" min-h-screen w-screen bg-gray-200 md:grid md:place-content-center p-8">
      <div className="bg-white rounded-2xl shadow-xl px-12 py-8 my-8 md:w-[40vw] max-md:relative max-md:top-8">
        <div className=" space-y-4 my-4">
          <h1 className=" text-4xl font-bold text-center">
            Create a new account
          </h1>
          <p className=" text-center text-sm font-normal">
            Join us today and start taking notes effortlessly.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col justify-center items-center space-y-3">
              <Button className="" type="submit">
                Sign up
              </Button>
              <div className=" flex justify-center items-center space-x-1">
                <p>Already have an account?</p>
                <Link className=" text-blue-500" href={`/sign-in`}>
                  Login
                </Link>
              </div>
            </div>
          </form>
        </Form>
        <div className=" w-full flex items-center justify-center space-x-6 my-3 md:my-6">
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
          className="bg-white border border-black rounded-lg flex justify-center items-center p-1 space-x-2 cursor-pointer"
        >
          <span>Continue with </span>
          <img className="size-5 md:size-8" src={googleIcon.src} alt="google" />
        </div>
      </div>
    </div>
  );
};

export default page;
