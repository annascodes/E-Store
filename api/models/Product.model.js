 
import mongoose, { mongo } from "mongoose"
 

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        desc: {
            type: String,
            required: true, 
        },
        price: {
            type: Number,
            required: true, 
        },
        instock: {
            type: Number,
            required: true, 
        },
        gender: {
            type: String,
            required: true, 
        },
        category: {
            type: String,
            required: true, 
        },
        images: {
            type: Array,
            required: true, 
        },
        size:{
            type:Array,
            required: false,
            default:[]
        },
        color:{
            type:Array,
            required: false,
            default:[],
        }
    },{timestamps:true}
)

const Product = mongoose.model('Product',productSchema)
export default Product;