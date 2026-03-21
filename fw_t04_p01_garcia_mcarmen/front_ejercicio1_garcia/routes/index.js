var express = require('express');
var router = express.Router();
const axios=require('axios');

/* GET home page. */
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

});

module.exports = router;
