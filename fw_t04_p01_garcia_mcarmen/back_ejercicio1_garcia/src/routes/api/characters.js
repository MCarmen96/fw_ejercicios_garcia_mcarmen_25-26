
const router = require('express').Router();
const characterController = require('../../controllers/character.controller');
const{createCharacterRules,validate}=require("../../validators/character.validator");
const { checkToken } = require("../../middlewares/auth.middleware");


router.get('/',checkToken,characterController.getAllCharacters);
router.get('/:id',checkToken,characterController.getCharactersById);
router.post('/',checkToken,createCharacterRules,validate,characterController.createCharacter);
router.put('/:id',checkToken,createCharacterRules,validate,characterController.updateCharacter);
router.delete('/:id',checkToken,characterController.deleteCharacter); 

module.exports=router; 

