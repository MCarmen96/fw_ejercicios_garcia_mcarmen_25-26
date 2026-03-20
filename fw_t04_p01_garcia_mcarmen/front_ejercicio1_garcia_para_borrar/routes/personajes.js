const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET DE PERSONAJES  */
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/characters`, {
            headers: { Authorization: `Bearer ${process.env.TOKEN}` }
        });
        console.log(response.data.data);
        res.render('home', { characters: response.data.data ,name:"carmen"});
    } catch (error) {
        res.status(500).render('error', { mensaje: 'Error al obtener personajes' });
    }
});

module.exports = router;