import exress from 'express'
import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            unique:true,

        }
    }
    ,
    {timestamps:true,}
)

const Category = mongoose.model('categories', categorySchema)

export default Category;

