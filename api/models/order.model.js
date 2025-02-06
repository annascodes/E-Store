import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user_name:{
            type:String,
            required:true
        },
        items:{
            type:Array,
        },
        grandTotal:{
            type:Number,
        },
        status:{
            type:String,
            required:true
        },
        paymentType:{
            type:String,
            required:true,
        },
        isSeen:{
            type:Boolean,
            default:false,
        }

    },
    {timestamps:true}
)

const Order = mongoose.model('Order',orderSchema)

export default Order;