import { Link } from "../models/Link.model.js";




export const getLink = async (req, res) => {
    try {
        const { nanolink } = req.params;
        const link = await Link.findOne({nanoLink:nanolink});

        if (!link) return res.status(404).json({ error: "el link no esixte" });

        return res.redirect(link.longLink);
    } catch (error) {
        console.log(error);
    }
}