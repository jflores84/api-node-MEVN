import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const paramLinkValidator = [
    param("id", "Formato de parametro id Incorrecto")
    .trim()
    .notEmpty()
    .escape()
    ,validationResultExpress
]



export const bodyLinkValidator = [
    body("longLink", "Formato de Link Incorrecto")
    .trim()
    .notEmpty()
    .isURL()
    ,validationResultExpress
]

export const bodyRegisterValidator = [
    body('email', 'formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),validationResultExpress,
];

export const bodyLoginValidator = [
    body("email", "formato de emial no valido")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo de 6 caracteres")
        .trim()
        .isLength({min: 6}),
        validationResultExpress
];