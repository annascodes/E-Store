import Product from "../models/Product.model.js"
import Category from '../models/category.model.js'
import { errHandler } from "../utils/error.js"



export const createProduct = async (req, res, next) => {
    if (!req.user.isAdmin) next(errHandler(403, '^Unauthorized to perform this action!!!'))

    console.log(req.body)

    try {
        const newProduct = new Product({
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            instock: req.body.instock,
            gender: req.body.gender,
            category: req.body.category,
            images: req.body.images,
            color: req.body.color,
            size: req.body.size,
        })
        await newProduct.save()
        res.status(200).json(newProduct)
    } catch (error) {
        next(error)
    }

}

export const getProduct = async (req, res, next) => {
    console.log(`inside showProduct`.bgWhite)
    try {

        const neededProduct = await Product.findById(req.params.pId)
        if (!neededProduct) next(errHandler(403, 'product not found!!!'))


        res.status(200).json(neededProduct)
    } catch (error) {
        next(error)
    }
}



export const getAllProducts = async (req, res, next) => {
    console.log(`sort: ${req.query.sort}`.bgWhite)
    console.log(`gender: ${req.query.gender}`.bgWhite)
    console.log(`category: ${req.query.category}`.bgWhite)
    console.log(`priceRange: ${req.query.priceRange}`.bgWhite)

    try {
        const startIndex = req.query.startIndex || 0;
        const limit = req.query.limit || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;

        const allProducts = await Product.find(
            {
                ...(req.query.gender && { gender: req.query.gender }),
                ...(req.query.category && { category: req.query.category.toUpperCase() })

            }
        ).sort({ createdAt: sortDirection }).skip(startIndex).limit(limit)
        console.log(allProducts.length)
        const totalProducts = await Product.countDocuments()

        res.status(200).json({
            allProducts,
            totalProducts,

        })
    } catch (error) {
        next(error)
    }

}

export const updateProduct = async (req, res, next) => {
    if (!req.user.isAdmin) next(errHandler(403, 'you can not perform this changing'))
    console.log(req.body)

    try {
        const updateProd = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                instock: req.body.instock,
                images: req.body.images,
                gender: req.body.gender,
                category: req.body.category,
                size: req.body.size,
                color: req.body.color,

            },
            { new: true }
        )
        res.status(200).json(updateProd)

    } catch (error) {
        next(error)
    }
}

export const getStats = async (req, res, next) => {
    try {
        const allCategories = await Category.find()
        const totalProducts = await Product.countDocuments()
        const menProducts = await Product.find({gender:'men'})
        const womenProducts = await Product.find({gender:'women'})
        let temp = []
         
        for (const c of allCategories) {
            const data = await Product.find({ category: `${c.name}` });
           temp.push({'categoryName': c.name,'data': data});
        }


        console.log('this is temp')
        console.log(temp)
        res.status(200).json({
            totalProducts,
            stats:temp ,
            menProducts,
            womenProducts

        })

    } catch (error) {
        next(error)
    }
}