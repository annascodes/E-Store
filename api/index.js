import express from 'express'
import colors from 'colors'
import mongoose from 'mongoose'
import dbConnection from './config/db.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import categoryRouter from './routes/category.route.js'
import productRouter from './routes/product.route.js'
import orderRouter from './routes/order.route.js'
import dotenv from 'dotenv'

import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()
// ---------database connection
dbConnection;
const port= 3000
app.listen(port,()=>{
    console.log(` server live on ${port} `.bgYellow)
})
// --------routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
// --------middleware 
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'middleware:internal error api/server'
    res.status(statusCode).json({success:false, statusCode, message})
})