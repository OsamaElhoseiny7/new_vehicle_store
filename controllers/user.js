import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User  from '../models/user.js'

export const login = async(req,res,next)=>{
    
    const {email,password} = req.body

    try{
        const userData = await User.fetchUserByEmail(email)
        !userData && res.json({message:'incorrect email!'})
        const hashedPassword = userData.password
        const passwordMatch = await bcrypt.compare(password,hashedPassword)
        !passwordMatch && res.json({message:'incorrect password'})
        const userJWT = jwt.sign({userId:userData._id},process.env.JWT_SECRET)
        res.json({token:userJWT})
    }
    catch(error){
        res.json({message:`something went wrong while trying to login! ${error.message}`})
    }
}

export const signup = async(req,res,next)=>{
    const {username, email, password} = req.body
    if(username && email && password){
        try{
            const hashedPassword = await bcrypt.hash(password,12)
            const user = new User(username, email, hashedPassword)
            const newUser = await user.newUser()
            const userJWT = jwt.sign({userId:newUser.insertedId.toString()},process.env.JWT_SECRET)
            res.json({token:userJWT})
        }
        catch(error){
            res.json({message:`something went wrong while trying to sign up! ${error.message}`})
        }
    }
}

export const fetchUser = async(req, res, next)=>{

    try{
        const currentUser = await User.fetchUserById(req.userId)  //we got this from auth middle ware
        return res.json({userData:currentUser})
    }
    catch(error){
            return res.json({message:`something went wrong while trying to get you data! ${error.message}`})
        }
}

export const editUser = async(req, res, next)=>{

    const {username, email, password, profilepicture} = req.body
    const {userId} = req
    try{
        const currentUserData  = await User.fetchUserById(userId)
        const newName = username ? username : currentUserData.username
        const newEmail = email ? email : currentUserData.email
        const newPassword = password ? await bcrypt.hash(password,12) : currentUserData.password
        const newProfilePicture = profilepicture ? profilepicture : currentUserData.profilepicture
        const userNewData = new User(newName, newEmail, newPassword, newProfilePicture)
        await userNewData.updateUser(userId) 
        return res.json({message:`your data has been updated successfully!`})
    }
     catch(error){
            return res.json({message:`something went wrong while trying to edit you data! ${error.message}`})
        }
}

export const addToCart = async(req, res, next)=>{

    const userId = req.userId
    const {vehicleId} = req.body
    try{
        await User.addToCart(userId,vehicleId)
        return res.json({message:`vehicle has been added successfully to your cart.`})
    }
    catch(error){
            return res.json({message:`something went wrong while trying to add a vehicle to your cart! ${error.message}`})
        }
}

export const purchaseVehicle = async(req, res, next)=>{

    const userId = req.userId
    const {vehicleId} = req.body
    try{
        await User.purchaseVehicle(userId,vehicleId)
        return res.json({message:`vehicle has been purchased successfully.`})
    }
    catch(error){
            return res.json({message:`something went wrong while trying to purchase a vehicle! ${error.message}`})
        }

}

export const removeUser = async(req, res, next)=>{
    const userId = req.userId
    try{
        await User.deleteUser(userId)
        return res.json({message:`your account has been removed successfully.`})     
    }
    catch(error){
            return res.json({message:`something went wrong while trying to remove your account! ${error.message}`})
        }
}

