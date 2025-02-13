import {Document , Schema} from "mongoose"
export interface User extends Document{
    username : string,
    email : string,
    password : string,
    image:string,
}

export interface Note extends Document{
    userId : Schema.Types.ObjectId,
    title : string,
    content : string,
}
