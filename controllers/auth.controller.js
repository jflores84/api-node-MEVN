import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../helpers/tokenManager.js";

export const register = async(req, res)=>{
    const { email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user) throw {code: 11000}
        user = new User({email, password});
        await user.save();
        //genera token=====esto es innecesario
           // const {token, expiresIn} = generateToken(user._id);
            //generateRefreshToken(user.id, res);
        //++++++++ lo he comentado para evitar ninicio de sesion automatico

        return res.json({ok: true});
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error: 'Usuario ya existe'});
        }
        return res.status(500).json({error: "error de servidor"});
    }
}

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        let user = await User.findOne({ email });
        if(!user) return res.status(403).json({error: "No existe este usuario"});
        
        const respuestaPassword = await user.comparePassword(password);
        if(!respuestaPassword) return res.status(403).json({error: "contrasena incorrecta"});

        const {token, expiresIn} = generateToken(user._id);
        generateRefreshToken(user.id, res);


        return res.json({ok: true});  
              
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }
}

export const infoUser = async(req, res)=>{
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({uid:user._id, email:user.email});
    } catch (error) {
        return res.status(500).json({error: "error de server"});
    }
}

export const refreshToken = (req, res) =>{
    try {
        // const refreshToken = req.cookies.refreshToken;
        // if(!refreshToken) throw new Error('No existe el token');

        // const {uid} = jwt.verify(refreshToken, process.env.JWT_REFRESH);

        const {token, expiresIn} = generateToken(req.uid);
        return res.json({token, expiresIn});  
    } catch (error) {
        console.log(error.message);
        res.status(401).json({error: error.message});
    }
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    return res.json({message: 'Logged Out'});
}