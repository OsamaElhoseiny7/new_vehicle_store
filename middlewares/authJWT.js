import jwt from 'jsonwebtoken'

const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization
    !authHeader && res.json({message:`headers are required for this request (token)`})   
    const token = authHeader.split(' ')[1]
     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).render({message:'unvalid token'});
    }
}

export default auth