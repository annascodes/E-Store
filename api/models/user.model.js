import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,

        },
        pic:{
            type:String,
            default:'https://images.unsplash.com/photo-1571566882372-1598d88abd90?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        isAdmin:{
            type:Boolean,
            default:true
            
        }
    },
    {
        timestamps:true,
    }
)

const User = mongoose.model('User', userSchema )
export default User;

