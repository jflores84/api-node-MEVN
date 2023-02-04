import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../helpers/tokenManager.js";

export const requireToken = (req, res, next)=>{
    try {
        //let token = req.cookies.token        
        let token = req.headers.authorization;
        if(!token) throw new Error('No existe el token en el header, usa bearer');
        token = token.split(" ")[1];
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        return next();
    } catch (error) {
       // console.log(error);
        return res
            .status(401)
            .json({error: error.message})
    }
}