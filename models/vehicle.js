import { getDB } from './mongoConnect.js'
import { ObjectId } from 'mongodb'


class Vehicle{
    constructor(title, describtion, imgsUrl, price){
        this.title = title
        this.describtion = describtion
        this.price = price
        this.imgsUrl = imgsUrl
    }

     addVehicle(){
        const db = getDB()
        return db.collection('vehicles').insertOne(this)
    }
     updateVehicle(vehicleId){
        const db = getDB()
        return db.collection('vehicles').updateOne({_id:new ObjectId(vehicleId)},{$set:this})
    }
     static deleteVehicle(vehicleId){
        const db = getDB()
        return db.collection('vehicles').deleteOne({_id:new ObjectId(vehicleId)})
    }
     static fetchVehicle(vehicleId){
        const db = getDB()
        return db.collection('vehicles').findOne({_id:new ObjectId(vehicleId)})
    }
     static fetchAllVehicles(){
        const db = getDB()
        return db.collection('vehicles').find().toArray()
    }
}

export default Vehicle;