const { body, validationResult } = require('express-validator');
const patron = /^S\d{2}E\d{2}$/;

const createEpisodiesRules=[
    body('code')
        .notEmpty().withMessage("El code es obligatorio")
        .matches(patron).withMessage("El formato debe ser SxxExx (ejemplo: S01E05)"),
    body('year')
        .notEmpty().withMessage("El año es obligatorio")
        .isInt({ min: 0 }).isLength({min:1,max:5}).withMessage("La edad debe ser un numero positivo"),
    body('characters')
        .isArray().withMessage("Characters tiene que ser un array"),
    body('characters.*')
        .isMongoId().withMessage("Los elementos del array deben de ser de tipo MongoId")
];
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
module.exports={createEpisodiesRules,validate}