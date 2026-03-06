require("dotenv").config();
// La conexión a la BD debe hacerse en index.js, antes de arrancar el servidor. 
// La conexión NO debe ir en app.js. app.js solo configura Express.
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

// * Nota: No es necesario usar http.createServer() con Express; app.listen() ya crea y gestiona el servidor HTTP internamente.
// Conectar primero a la base de datos
connectDB().then(() => {
    // Solo arrancamos el servidor si la BD conecta
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
});

