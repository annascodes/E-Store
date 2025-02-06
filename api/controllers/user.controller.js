import User from '../models/user.model.js'
import {errHandler} from '../utils/error.js'
import bcryptjs from 'bcryptjs'

export const signout = async(req, res, next)=>{
    console.log('inside sigout')
    try {
        res.status(200).clearCookie('access_token').json('sign-out successful!')
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req, res, next)=>{
    console.log('req.body:', req.body) 
    if (req.params.id !== req.user.id){
        return next(errHandler(403, 'you cannot change someone else profile'))
    }

  if(req.body.password == ' ') next(errHandler(403, 'password can not be only just a whitespace'))
   
    if(req.body.password){

       req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    email:req.body.email,
                    username:req.body.username,
                    password:req.body.password,
                    pic: req.body.pic,
                }
            },
            { new: true }
            
            )
        const {password, ...rest} = updateUser._doc
        res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }

   


    
    
}