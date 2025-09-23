import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({message:"Access Denied"});
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified.user;
        next();
    } catch (err) {
        return res.status(401).json({message:"Invalid Token"});
    }
}

export default fetchuser;