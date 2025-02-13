import {Schema , model , models} from "mongoose"
import { User } from "@/interfaces/interface"
const userSchema = new Schema<User>({
    username:{
        type:String,
        trim:true,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"",
    }
} , {
    timestamps:true
})

const userModel = models.User || model("User", userSchema);

export default userModel;