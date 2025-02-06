import Category from "../models/category.model.js"
import { errHandler } from "../utils/error.js"

export const addCategory = async(req, res, next)=>{
    // console.log(req.body)
    if(!req.user.isAdmin) next(errHandler(403, '^You are not authorized to this action!'))
    try {
        const newCateg = new Category({
            name:req.body.category.toUpperCase()
        })
        await newCateg.save()
        res.status(200).json(newCateg)
    } catch (error) {
        next(error)
    }
}

export const getallcategories = async(req, res, next)=>{
    // if(!req.user.isAdmin) next(errHandler(403, '^you are not authorized'))

    try {
        const allCtgs = await Category.find()
        
        res.status(200).json(allCtgs)
    } catch (error) {
        next(error)
    }
}