// * Aquí definimos los métodos HTTP.

const router = require('express').Router();
const placesController = require('../../controllers/places.controller');

router.get('/', placesController.getPlaces);
router.post('/', placesController.createPlace);
router.put('/:id', placesController.updatePlace);
router.delete('/:id', placesController.deletePlace);

// Exportamos el router para poder usarlo en otros archivos
module.exports = router;

/*  
Importante:
GET /api/places
POST /api/places
PUT /api/places/:id
DELETE /api/places/:id */
