const axios = require('axios');

/**
 * Realiza el login y devuelve únicamente el token.
 */
const getToken = async () => {
    const loginData = {
        email: process.env.API_EMAIL,
        password: process.env.API_PASSWORD
    };
    // realizo el post del login 
    const response = await axios.post(process.env.API_URL+process.env.API_LOGIN_URL, loginData);
    console.log(response);
    // Retornamos el token (ajusta la ruta según el JSON de tu API)
    return response.data.token; 
};

module.exports = { getToken };