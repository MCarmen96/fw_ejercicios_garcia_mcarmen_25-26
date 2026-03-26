var express = require('express');
var router = express.Router();
const axios=require('axios');


// Importamos el controlador
const indexController = require('../controllers/indexController');

/* GET home page. */
// Simplemente asociamos la ruta al método del controlador
router.get('/', indexController.renderIndex);
router.get('/episodios', indexController.renderEpisodios);
router.get('/api/characters',indexController.dataCharacters);
router.get('/api/episodes/:id',indexController.dataEpisodes);


/* /* GET home page.
router.get('/', async (req, res, next) =>{

  try{
    const response=await axios.get(`http://localhost:3000/api/characters?page=1&limit=4`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` } } );

    
    console.log(response.data);
    const numPaginas=response.data.pagination.totalPages;
    console.log("Numero de paginas-> "+numPaginas);


    
    res.render('index', { title: 'Express',characters:response.data.data ,paginas:numPaginas});

  }catch(error){
    res.status(500).render('error', { mensaje: 'Error al obtener personajes' });
  };

}); */

module.exports = router;
