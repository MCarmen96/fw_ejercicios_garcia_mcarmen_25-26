const router = require('express').Router();
const episodeController = require('../../controllers/episode.controller');
const{createEpisodiesRules,validate,updateEpisodies}=require('../../validators/episode.validator')

const { checkToken } = require("../../middlewares/auth.middleware");

//router.use(checkToken); bloqueo por defecto

router.get('/',checkToken,episodeController.getAllEpisodies);
router.get('/:id',checkToken,episodeController.getEpisodiesById);

router.post('/',checkToken,createEpisodiesRules,validate,episodeController.createEpisodies);
router.put('/:id',checkToken,updateEpisodies,validate,episodeController.updateEpisodies);
router.delete('/:id',checkToken,episodeController.deleteEpisodies);

module.exports=router; 