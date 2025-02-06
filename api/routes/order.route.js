import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createOrder, getAllOrders, getCustomerOrders, getOrder, markItSeen, stats } from '../controllers/order.controller.js';

const router= express.Router()

router.post('/createorder', verifyToken, createOrder)
router.get('/getorder/:id',verifyToken, getOrder)
router.get('/getallorders', verifyToken, getAllOrders)
router.put('/markitseen/:id', verifyToken, markItSeen)
router.get('/stats', verifyToken, stats)
router.get('/getcustomerorders/:username', verifyToken, getCustomerOrders)

export default router;