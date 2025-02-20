"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { useSession } from "next-auth/react";
import { useNotes } from "@/state/store";
const AddData = () => {
  const [open , setOpen] = useState(false)
  const [isSubmitting , setIsSubmitting] = useState<boolean>(false)
  const {addData} = useNotes();
    const {data:session } = useSession();
  const [title, setTitle] = useState<string>(``);
  const [content, setContent] = useState<string>(``);
  return (
    <div className=" text-black flex flex-col justify-center items-center px-4 pt-16">
        <div className=" md:w-9/12 self-start pb-12">
            <p className=" text-white font-semibold text-2xl md:text-4xl selection:bg-white selection:text-black">
            Keep your ideas organized with ease.  
            </p>
            <p className=" text-white font-bold text-3xl md:text-5xl selection:bg-white selection:text-black">
             Write down notes, manage tasks, and stay productive.
            </p>
        </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={()=>setOpen(true)}>
            <Plus />
            Add note
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#18181B] text-white">
          <DialogHeader>
            <DialogTitle className=" text-white">Create Note</DialogTitle>
            <DialogDescription className=" text-white">
            Write down notes, manage tasks, and stay productive.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                 name="content"
                className=" col-span-3"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                setIsSubmitting(true)
                 if(session?.user._id){
                  await addData({title , content} , session?.user._id)
                 }
                 setIsSubmitting(false);
                 setTitle(``);
                 setContent(``);
                 setOpen(false)
              }
            }  
               disabled={isSubmitting}    
              className=" text-black bg-white hover:bg-gray-200"
              type="submit"
            >
              {isSubmitting && <LoaderCircle className=" animate-spin"/>} {isSubmitting ? 'Saving..' : "Save"}
            </Button>
          </DialogFooter> 
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddData;
