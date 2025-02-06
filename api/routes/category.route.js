import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { addCategory, getallcategories } from '../controllers/category.controller.js'

const router = express.Router()

router.post('/addcategory', verifyToken, addCategory )
router.get('/getallcategories', verifyToken, getallcategories)

export default router;