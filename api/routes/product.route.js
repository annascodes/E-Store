import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createProduct, getAllProducts, getProduct, getStats, updateProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.post('/createproduct',verifyToken, createProduct)
router.get('/getproduct/:pId', getProduct )
router.get('/getallproducts', getAllProducts)
router.put('/updateproduct/:id', verifyToken, updateProduct )
router.get('/getstats', verifyToken, getStats )


export default router;