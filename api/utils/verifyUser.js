 import jwt from 'jsonwebtoken'
import { errHandler } from './error.js'


 export const verifyToken = (req, res, next)=>{
      
    const token = req.cookies.access_token     

    if(!token) next(errHandler(401, '^not verifyToken'))

    jwt.verify(token, 'my_jwt_key', 
                (err, user)=>{
                    console.log(user)
                    if(err) next(errHandler(401,'^err in verifyToken'));
                    req.user = user;
                    next();

                }) 
 }