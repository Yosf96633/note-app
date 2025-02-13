import {Schema , model , models} from "mongoose"
import { Note } from "@/interfaces/interface"

const noteSchema = new Schema<Note>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        trim:true,
    },
    content:{
        type:String,
        trim:true,
    }
} , {
    timestamps:true
})


const noteModel = models.User || model("User", noteSchema);

export default noteModel;