require("dotenv").config();
const dns = require('dns');
dns.setServers(['192.168.1.1', '8.8.8.8']);

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
})


