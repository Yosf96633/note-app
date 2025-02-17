"use client";
import React from "react";
import { useSession , signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button";
const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <header className="selection:bg-white selection:text-black  flex justify-between items-center sticky top-0 z-50 backdrop-blur-lg text-white border-b border-white px-5 py-4">
      <h1 className=" text-2xl md:text-4xl font-semibold">Notee</h1>
      { status==="authenticated" && <div className=" flex items-center justify-center space-x-2">
        <Avatar>
          <AvatarImage src={session.user.image}/>
        <AvatarFallback className=" text-black">{session?.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <Separator className=" text-red-500 mx-2" orientation="vertical" />
        <Button className=" text-black bg-white hover:bg-gray-200" onClick={()=>{
            signOut();
        }}>Logout</Button>
      </div>}
    </header>
  );
};

export default Navbar;
