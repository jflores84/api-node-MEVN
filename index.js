import express from "express";
import {config} from "dotenv";
import authRouter from "./routes/auth.routes.js";
import linkRouter from "./routes/link.routes.js";
import redirectRouter from "./routes/redirect.routes.js";
import "./database/connectdb.js"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";


config();
const app = express();

//middlewares

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (!origin || whiteList.includes(origin)) {
//                 return callback(null, origin);
//             }
//             return callback(
//                 "Error de CORS origin: " + origin + " No autorizado!"
//             );
//         },
//         credentials: true,
//     })
// );
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));



//rutas NO INCLUIR MIDDLEWARES DESPUES DE ESTA SECCION
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);
app.use("/", redirectRouter);


//solo para ejemplo
//app.use(express.static('public'));


app.get("/", (req,res)=>{
    res.json({ok:'true 🔥🔥🔥🔥'});
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("http://localhost:"+ port);
});