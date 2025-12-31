import Vehicle from '../models/vehicle.js'
import  cloudinary  from '../middlewares/cloudinary.js'
import fs from 'fs'
import { error } from 'console'

export const addVehicle = async (req, res, next)=> {
  const { title, describtion, price } = req.body

  if (!req.files) {
    return res.status(400).json({ message: 'Image is required' })
  }

  const imgUploader = (filePath) => {
      return cloudinary.uploader.upload(filePath)   
  }

try{
  const filesData = await Promise.all(req.files.map(file=>imgUploader(file.path)))
  const imgsUrl = filesData.map(result=>result.secure_url)
  const vehicle = new Vehicle(title, describtion, imgsUrl, price)
  await vehicle.addVehicle()   
  return res.json({ message: `${title} has been added successfully `}) 
}
catch(error){
  return res.status(500).json({message:`something went wrong while uploading images '+${error.message}`})
}
finally{
  req.files?.forEach((file)=>{
    if (fs.existsSync(file.path)){
      try{
         fs.unlinkSync(file.path)
      }
      catch(error){
        console.log('cant delete some files correctly!')
      }  
    }
    
  })
}
}

export const getVehicles = (req,res,next)=>{
    Vehicle.fetchAllVehicles()
    .then(vehicles=>{
        res.json({vehicles})
    })
    .catch((e)=>{
        res.json({message:'something went wrong while fetching all products!'})
    })
}

export const getVehicle = (req,res,next)=>{
    const {id} = req.params
    Vehicle.fetchVehicle(id)
    .then(vehicle=>{
        res.json({vehicle})
    })
     .catch((e)=>{
        res.json({message:'something went wrong while fetching your specific product!'})
    })
}

export const editVehicle = async(req,res,next)=>{
    const {id} = req.params
    const currentData = await Vehicle.fetchVehicle(id)
    const title = req.body.title ? req.body.title : currentData.title
    const describtion = req.body.describtion ? req.body.describtion : currentData.describtion
    const price = req.body.price ? req.body.price : currentData.price

    if(req.files){
      try{
        const cloudinaryUploader = (filepath)=>cloudinary.uploader.upload(filepath)
        const filesData = await Promise.all(req.files.map(file=>cloudinaryUploader(file.path)))
        const filesURL = filesData.map(resutl=> resutl.secure_url)
        const imgsURL = filesURL
        const updatedVehicle = new Vehicle(title, describtion, imgsURL, price)
        updatedVehicle.updateVehicle(id)
      }
      catch(eror){
        return res.json({message:`some thing went wrong while truning to uplaod you updated images ${error.message}`})
      }
      finally{
        req.files.forEach(file=>{
          if(fs.existsSync(file.path)){
            try{
              fs.unlinkSync(file.path)
            }
            catch(error){
              console.log(`some thing went wrong while trying to delete files on desk storage`)
            }
          }
        })

      }
    }
    else{
      const imgsURL = currentData.imgsURL
      const updatedVehicle = new Vehicle(title, describtion, imgsURL, price)
      updatedVehicle.updateVehicle(id)
    }
 
}

export const deleteVehicle = (req,res,next)=>{
    const {id} = req.params
    Vehicle.deleteVehicle(id)
    .then(result=>{
        res.json({message:'product has been deleted successfully!'})
    })
    .catch(err=>console.log("something went wrong with editing our product"))
}