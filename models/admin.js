import { ObjectId } from "mongodb"
import { getDB } from "./mongoConnect"


class Admin{

    constructor(adminname,email, password){
        this.adminname = adminname
        this.email = email
        this.password = password
        this.adminvehicles = []
    }

    newAdmin(){
        const db = getDB()
        return db.collection('admins').insertOne(this)
    }

    updateAdmin(adminId){
        const db = getDB()
        return db.collection('admins').updateOne({_id:new ObjectId(adminId)},{$set:this})
    }

    deleteAdmin(adminId){
        const db = getDB()
        return db.collection('admins').deleteOne({_id:new ObjectId(adminId)})
    }

    createVehicle(adminId,createdVehicleId){
        const db = getDB()
        return db.collection('admins').updateOne({_id:new ObjectId(adminId)},{$push:{adminvehicles:{createdVehicleId}}})
    }



}