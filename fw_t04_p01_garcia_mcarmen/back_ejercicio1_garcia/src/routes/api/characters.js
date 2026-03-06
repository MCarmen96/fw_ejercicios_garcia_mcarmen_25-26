
const router = require('express').Router();
const characterController = require('../../controllers/character.controller');

router.get('/',characterController.getAllCharacters);
router.get('/:id',characterController.getCharactersById);
router.post('/',characterController.createCharacter);
router.put('/:id',characterController.updateCharacter);
router.delete('/:id',characterController.deleteCharacter); 

module.exports=router; 

