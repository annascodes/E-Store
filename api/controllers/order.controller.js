import Order from "../models/order.model.js"
import { errHandler } from "../utils/error.js"


export const createOrder = async (req, res, next) => {
    console.log(req.body)
    if (req.body.items.length === 0 || req.body.grandTotal === 0) next(errHandler(403, 'Bag is empty'))
    try {
        const newOrder = new Order(req.body)
        await newOrder.save()
        res.status(200).json(newOrder)

    } catch (error) {
        next(error)
    }

}

export const getOrder = async (req, res, next) => {
    if (!req.user) next(errHandler(404, ' not sign-in'))

    try {
        const requiredOrder = await Order.findOne({ _id: req.params.id })

        if (!requiredOrder) {
            console.log("it works")

            next(errHandler(403, 'Order does not exist/found'))
        }

        res.status(200).json(requiredOrder)
    } catch (error) {
        next(error)
    }
}


export const getAllOrders = async (req, res, next) => {
    try {
        const allorders = await Order.find().sort({ updatedAt: -1 })
        const totalOrders = await Order.countDocuments()
        res.status(200).json({
            allorders,
            totalOrders
        })
    } catch (error) {
        next(error)
    }
}

export const markItSeen = async (req, res, next) => {


    try {
        const result = await Order.updateOne(
            { _id: req.params.id },
            {
                $set: { isSeen: true },
                $currentDate: { lastModified: true }
            }

        )
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const stats = async (req, res, next) => {
    try {
        const totalOrders = await Order.countDocuments()
        const notSeenOrders = await Order.find({ isSeen: false })
        const statusDelivered = await Order.find({ status: 'delivered' })
        const statusDispatched = await Order.find({ status: 'dispatched' })
        const statusProcessing = await Order.find({ status: 'processing' })
        const statusCancelled = await Order.find({ status: 'cancelled' })

        res.status(200).json(
            { 
                totalOrders,
                notSeenOrders,
                statusDelivered,
                statusDispatched,
                statusProcessing,
                statusCancelled,
    })
    } catch (error) {
        next(error)
    }
}


export const getCustomerOrders = async (req, res, next) => {
    // if(req.user.id !== req.params.) next(errHandler(403, 'authorization error'))

    try {
        const CustomerOrders = await Order.find({ user_name: req.params.username }).sort({ createdAt: -1 })
        res.status(200).json(CustomerOrders)
    } catch (error) {
        next(error)
    }

}