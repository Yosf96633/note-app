import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical , Trash} from 'lucide-react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import axios from "axios";
import { useNotes } from "@/state/store";
interface props {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
}

const NoteCard = ({ _id, userId, title, content, createdAt }: props) => {
  const {deleteNote} = useNotes();
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = String(date.getFullYear()).slice(-2); 
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, "0");
    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
  };
  const formattedDate = formatDate(createdAt);
  return (
    <Card className=" bg-black selection:bg-white selection:text-black">
      <CardHeader className=" relative">
        <CardTitle className=" text-white text-xl font-bold md:text-2xl md:font-bold">{title}</CardTitle>
        <CardDescription className=" text-white md:text-lg font-normal">{content}</CardDescription>
        <Menubar className=" bg-black text-white absolute top-4 right-4">
  <MenubarMenu>
    <MenubarTrigger className="  bg-black border-none outline-none"><EllipsisVertical  className=" text-white"/>
    </MenubarTrigger>
    <MenubarContent>
      <MenubarItem onClick={async ()=>{
        try {
          const response = await axios.delete(`/api/delete-note/${userId.toString()}/${_id.toString()}`)
          console.log(response.data);
          if(response.data?.success){
                deleteNote(response.data.result._id);
               
          }
        } catch (error) {
           console.log(error)
        }
           
      }} className="flex text-red-500 hover:text-red-600 justify-center items-center space-x-2">
        <Trash className=" size-5"/><p>Delete</p>
      </MenubarItem>

    </MenubarContent>
  </MenubarMenu>
</Menubar>

      </CardHeader>
      <CardFooter className=" text-gray-400 max-md:text-sm">{formattedDate}</CardFooter>
    </Card>
  );
};

export default NoteCard;
