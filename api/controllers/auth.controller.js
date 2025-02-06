import User from "../models/user.model.js"
import { errHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async(req, res, next)=>{
    console.log(req.body.username)
    console.log(req.body.email)
    console.log(req.body.password)
    
    if (!req.body.username || !req.body.email || !req.body.password || req.body.username === '' || req.body.email==='' || req.body.password ===''){
        console.log('something missing in the fields')
        return next(errHandler(400, '^all fields are required'))
    }
    const hashedPass = bcryptjs.hashSync(req.body.password, 10)
    const newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password:hashedPass,
            pic: req.body.pic,
            isAdmin: req.body.isAdmin,
        }
    )
    try {
        await newUser.save()
        res.json({msg:'sign up successfully.'})
    } catch (error) {
        next(error)
    }
}

export const signin = async(req, res, next)=>{
    console.log(req.body.username)
    console.log(req.body.password)
    console.log('so far so good')

    if(!req.body.username || !req.body.password || req.body.username ==='' ||req.body.password ===''){
        return next(errHandler(403,'^all fields are required!'))
    }

    
    try {
        const validUser = await User.findOne({username:req.body.username})
        if(!validUser)next(errHandler(404, '^user not found!'))

        const validPass = bcryptjs.compareSync(req.body.password, validUser.password)
        if(!validPass)next(errHandler(404,'^Invalid Pass'))
            
        const token = jwt.sign(
            {id:validUser._id, isAdmin: validUser.isAdmin},
            'my_jwt_key',
        )

        const {password, ...rest} = validUser._doc;
        res.status(200).cookie('access_token',token, {httpOnly:true}).json(rest);


    } catch (error) {
        next(error)
    }
}

export const googleAuth = async(req, res, next)=>{
    console.log(req.body)

    if (!req.body.username || !req.body.email || !req.body.pic || 
        req.body.username === '' || req.body.email === '' || req.body.pic ==='')next(errHandler(403,'something went wrong in taking fields from firebase!!!'))
    
    try {
        // --- if credentials ALREADY EXIST in db --- 
        const user = await User.findOne({username:req.body.username})
        console.log('user found:', user)
        if(user){
            console.log('inside it')
            const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},'my_jwt_key')
            const {password, ... rest} = user._doc;
            res.status(200).cookie('access_token', token, {httpOnly:true}).json(rest)
        }else{
            // --- if credentials DOES'T EXIST in db:(NEW USER) --- 
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedpass = bcryptjs.hashSync(generatePassword, 10)
            const newUser = new User(
                {
                    username:req.body.username,
                    email: req.body.email,
                    password:hashedpass,
                    pic: req.body.pic,
                }
            )
            await newUser.save()
            const token = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin}, 'my_jwt_key')
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
        } 
    } catch (error) {
        next(error)
    }
    
}