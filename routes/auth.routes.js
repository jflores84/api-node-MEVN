import { Router } from "express";
import { infoUser, login, register, refreshToken, logout  } from "../controllers/auth.controller.js";
//import { body } from "express-validator";
//import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyRegisterValidator, bodyLoginValidator } from "../middlewares/validatorManager.js";
const router = Router();

router.post('/register', bodyRegisterValidator, register);
router.post('/login', bodyLoginValidator, login);
router.get("/logout", logout);

router.get("/refresh", requireRefreshToken ,refreshToken);




router.get('/protected', requireToken, infoUser);


export default router;