import {config as dotenvConfig} from 'dotenv'
dotenvConfig()
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
// require('dotenv').config()

import express, { json, urlencoded } from 'express'
// const session  = require('express-session')
const app = express()
// console.log(process.env.CLOUDINARY_CLOUD_NAME)

import vehicleRoutes from '../routers/vehicle.js'
import userRoutes from '../routers/user.js'
import adminRoutes from '../routers/admin.js'
import { mongoConnect } from '../models/mongoConnect.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine','ejs')
app.set('views','views')
app.use(cors());
app.use(json())
app.use(urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'Styles')))
app.use(express.static(path.join(__dirname,'Images')))

app.use(vehicleRoutes)
app.use(userRoutes)
app.use(adminRoutes)

// mongoConnect(()=>app.listen(5000))
mongoConnect()


