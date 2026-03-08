const { body, validationResult } = require('express-validator');

// REGLAS PARA CREAR UN PERSONAJE
const createCharacterRules = [
    body('name')
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 100 }).withMessage("Entre 2 y 100 caracteres"),
    body('age')
        .notEmpty().withMessage("La edad es obligatoria")
        .isInt({ min: 0 }).withMessage("La edad debe ser un numero positivo"),
    body('species')
        .notEmpty().withMessage("La especie es obligatoria")
        .isLength({ min: 2, max: 100 }).withMessage("Entre 2 y 100 caracteres"),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports={createCharacterRules,validate};