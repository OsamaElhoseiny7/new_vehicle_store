import { Router } from 'express'
const router = Router()
import auth from '../middlewares/authJWT.js'
import { login, signup, fetchUser, editUser, addToCart, purchaseVehicle, removeUser } from '../controllers/user.js'


router.post('user/login', login)
router.post('user/signup', signup)
router.post('user/editdata', auth, editUser)
router.post('user/addtocart', auth, addToCart)
router.post('user/purchasevehicle', auth, purchaseVehicle)
router.get('user/userdata', auth, fetchUser)
router.delete('user/removeuser', auth, removeUser)



export default router
