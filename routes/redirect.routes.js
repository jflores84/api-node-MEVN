import { Router } from "express";
import { getLink } from "../controllers/redirect.controller.js";

const router = Router();

router.get('/:nanolink', getLink);



export default router;