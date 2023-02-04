import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";

const router = Router();

//get       /api/v1/links         all links
    router.get('/', requireToken, getLinks);

//get       /apiv1/links/:id      single link
    //router.get('/:id', requireToken, getLink);
    router.get('/:nanolink', getLink);
    
//post      /api/v1/links         create link
    router.post('/', requireToken, bodyLinkValidator, createLink);

//patch/put /api/v1/links/:id     update link
    router.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink);
    
//delete    /api/v1/links/:id     update link
    router.delete('/:id', requireToken, paramLinkValidator, removeLink);

export default router;