import jwt from "jsonwebtoken";
const expiresIn = 60 * 15;

export const generateToken = (uid) => {
    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn }
    } catch (error) {
        console.log(error);
    }
}


export const generateRefreshToken = (uid, res) => {
    //const expiresIn = 60 * 15;
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
        return res.cookie("refreshToken", refreshToken, {
            sameSite: "none",
            domain: "http://localhost:900",
            httpOnly: true,
            secure: false,
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        console.log(error);
    }
}

// export const generateRefreshToken = (uid, res) => {
//     //const expiresIn = 60 * 15;
//     try {
//         const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn });
//         return res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             //secure: !(process.env.MODO === "developer"),
//             secure:false,

//             expires: new Date(Date.now() + expiresIn * 1000)
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es válida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no válido",
    "No Bearer": "No hay portadora Bearer",
    "jwt malformed": "JWT malformado",
};