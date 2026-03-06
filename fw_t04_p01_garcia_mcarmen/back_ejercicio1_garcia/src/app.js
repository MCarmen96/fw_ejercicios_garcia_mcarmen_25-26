const express = require('express');
const cors = require('cors');

//express() devuelve una aplicación HTTP.
const app = express();

// Middleware CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());
//delegación de todo lo que empiece por /api al api.js
app.use('/api', require('./routes/api'));

module.exports = app;
