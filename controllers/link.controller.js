import { nanoid } from "nanoid";
import { Link } from "../models/Link.model.js";





export const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { longLink } = req.body;

        console.log(longLink);
        
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "el link no esixte" });
        if (!link.uid.equals(req.uid)) return res.status(404).json({ error: "el link no le pertenece" });

        //actualizar
        const updateLink = await Link.findByIdAndUpdate(id, {longLink: longLink}, {returnDocument:'after'});
        res.json({ updateLink });
    } catch (error) {
        console.log(error);
    }
}


export const removeLink = async (req, res) => {
    //sacar un solo id no deberia ser con find by id, sino con find y filtrar el uid desde el request
    try {
        const { id } = req.params;
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "el link no esixte" });
        if (!link.uid.equals(req.uid)) return res.status(404).json({ error: "el link no le pertenece" });

        await link.remove();

        res.json({ link });
    } catch (error) {
        console.log(error);
    }
}



export const getLink = async (req, res) => {
    try {
        const { nanolink } = req.params;
        const link = await Link.findOne({nanoLink:nanolink});

        if (!link) return res.status(404).json({ error: "el link no esixte" });

        res.json({ longLink: link.longLink });
    } catch (error) {
        console.log(error);
    }
}

export const getLinkCRUD = async (req, res) => {
    //sacar un solo id no deberia ser con find by id, sino con find y filtrar el uid desde el request
    try {
        const { id } = req.params;
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "el link no esixte" });
        if (!link.uid.equals(req.uid)) res.status(404).json({ error: "el link no le pertenece" });

        res.json({ link });
    } catch (error) {
        console.log(error);
    }
}


export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });
        res.json({ links });
    } catch (error) {
        console.log(error);
    }
}

export const createLink = async (req, res) => {
    try {
        const { longLink } = req.body;
        console.log(longLink);

        const link = new Link({
            longLink: longLink,
            nanoLink: nanoid(6),
            uid: req.uid
        });

        const newLink = await link.save();
        return res.status(201).json( newLink );
    } catch (error) {

    }
}