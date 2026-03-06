
const router = require('express').Router();

// todo para que todas las rutas enpiecen por /api/characters o api/episodes

router.use('/characters',require('./api/characters'));
router.use('/episodes',require('./api/episodes')); 

 module.exports=router;