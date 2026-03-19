const { body, validationResult } = require('express-validator');
const patron = /^S\d{2}E\d{2}$/;
// REGLAS PARA CREAR UN PERSONAJE
const createCharacterRules = [
    body('name')
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El valor debe ser una cadena de carateres")
        .isLength({ min: 2, max: 100 }).withMessage("Entre 2 y 100 caracteres"),
    body('age')
        .notEmpty().withMessage("La edad es obligatoria")
        .isInt({ min: 0 }).withMessage("La edad debe ser un numero positivo"),
    body('species')
        .notEmpty().withMessage("La especie es obligatoria")
        .isString().withMessage("El valor debe ser una cadena de carateres")
        .isLength({ min: 2, max: 100 }).withMessage("Entre 2 y 100 caracteres"),
];

const updateCharacter=[
    body('name')
        .optional()
        .isString().withMessage("El valor debe ser una cadena de carateres")
        .isLength({ min: 2, max: 100 }).withMessage("Entre 2 y 100 caracteres"),
    body('age')
        .optional()
        .isInt({ min: 0 }).withMessage("La edad debe ser un numero positivo"),
    body('img')
        .optional(),
    body('species')
        .optional()
        .isString().withMessage("El valor debe ser una cadena de carateres")
        .isLength({ min: 2, max: 100 }).withMessage("Entre 2 y 100 caracteres"),
    body('specialTraits')
        .optional()
        .isArray().withMessage("tiene que ser un array"),
    body('role')
        .optional()
        .isString().withMessage("El valor debe ser una cadena de carateres")
        .isLength({ min: 2, max: 100 }).withMessage("Entre 2 y 100 caracteres"),
    body('firstAppearance')
        .optional()
        .matches(patron).withMessage("El formato debe ser SxxExx (ejemplo: S01E05)")

];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports={createCharacterRules,updateCharacter,validate};