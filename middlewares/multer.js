import multer from 'multer'
import path from 'path'

// for local storage on pc
const storage = multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'Images'),
    filename:(req,file,cb)=> cb(null,Date.now() + path.extname(file.originalname)),
})

// const storage = multer.memoryStorage()
// for local filter
const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }
    else{
        cb(new Error('sorry we accept only images'), false)
    }
}

const upload = multer({storage,fileFilter})
export default upload;