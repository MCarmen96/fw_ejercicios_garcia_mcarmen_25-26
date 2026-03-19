const express = require('express');
const app = express();

const path = require('path');


require("dotenv").config();

// CONFIGURACION DE MOTOR DE PLANTILLAS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
const personajesRouter=require('./routes/personajes');
app.use('/',personajesRouter);
//const episodiosRouter = require('./routes/episodios');

app.get('/', (req, res) => {
    res.render('home', { titulo: 'FW Series - Inicio' });
});

// Arrancar servidor
const PORT = process.env.PORT || 3001;
const apiUrl = process.env.API_URL;
const token = process.env.TOKEN;

app.listen(PORT, () => {
    console.log(`Servidor Frontend corriendo en http://localhost:${PORT}`);
});