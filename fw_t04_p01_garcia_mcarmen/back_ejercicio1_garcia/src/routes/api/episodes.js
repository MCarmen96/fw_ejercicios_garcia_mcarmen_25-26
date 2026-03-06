const router = require('express').Router();
const episodeController = require('../../controllers/episode.controller');

router.get('/',episodeController.getAllEpisodies);
router.get('/:id',episodeController.getEpisodiesById);
router.post('/',episodeController.createEpisodies);
router.put('/:id',episodeController.updateEpisodies);
router.delete('/:id',episodeController.deleteEpisodies);

module.exports=router; 