import { tokenVerificationErrors } from "../helpers/tokenManager.js";
import jwt  from "jsonwebtoken";

export const requireRefreshToken = (req, res, next)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) throw new Error('No existe el token');

        const {uid} = jwt.verify(refreshToken, process.env.JWT_REFRESH);

        req.uid = uid;
        next();

    } catch (error) {
      console.log(error);
      res.status(401).json({error: tokenVerificationErrors[error.message]})  
    }
}