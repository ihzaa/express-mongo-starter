import { validationResult } from "express-validator";

const returnOnError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let message = `${errors.array()[0].param} ${errors.array()[0].msg}`;
        return res.status(422).json({
            status: false,
            message: message.charAt(0).toUpperCase() + message.slice(1),
        });
    }
    next();
}

export default returnOnError;