import { Router } from 'express'
const router = Router()
import { getVehicle, getVehicles, addVehicle, editVehicle, deleteVehicle } from '../controllers/vehicle.js'
import upload from '../middlewares/multer.js'


router.get('/vehicles', getVehicles)
router.get('/vehicles/:id', getVehicle)
router.post('/admin/addvehicle', upload.array('imgsUrl',4), addVehicle)
router.post('/admin/editvehicle/:id', upload.array('imgsUrl',4), editVehicle)
router.post('/admin/removevehicle/:id',deleteVehicle)

export default router;