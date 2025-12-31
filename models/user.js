import { getDB } from "./mongoConnect.js"
import { ObjectId } from 'mongodb'

class User {
    constructor(username, email, password, profilepicture=''){
        this.username = username
        this.password = password
        this.email = email
        this.cart = []
        this.purchasedVehicles = []
        this.profilepicture = profilepicture
    }

    newUser(){
        const db = getDB()
        return db.collection('users').insertOne(this)
    }

    updateUser(userId){
        const db = getDB()
        return db.collection('users').updateOne({_id:new ObjectId(userId)},{$set:this})
    }

     static fetchUserByEmail(email){
        const db = getDB()
        return db.collection('users').findOne({email})
    }

    static fetchUserById(userId){
        const db = getDB()
        return db.collection('users').findOne({_id:new ObjectId(userId)})
    }

     static deleteUser(userId){
        const db = getDB()
        return db.collection('users').deleteOne({_id:new ObjectId(userId)})
    }

    static addToCart(userId, vehicleId){
        const db = getDB()
        return db.collection('users').updateOne({_id:new ObjectId(userId)},{$push:{cart:{vehicleId}}})
    }

    static purchaseVehicle(email, vehicleId){
        const db = getDB()
        return db.collection('users').updateOne({email},{$push:{purchasedVehicles:{vehicleId}}})
    }

}

export default User