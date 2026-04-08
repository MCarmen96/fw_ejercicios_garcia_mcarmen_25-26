const axios = require('axios');

/**
 * Servicio para obtener personajes de la API externa.
 * @param {number} page - Número de página.
 * @param {number} limit - Límite de elementos.
 * @returns {Promise<Object>} Datos de la respuesta de la API.
 */

const getCharacters = async (token, page = 1) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(`http://localhost:3000/api/characters?page=${page}&limit=4`, config);
    return response.data;
};
const getEpisodios = async (token) => {

    const url = "http://localhost:3000/api/episodes";
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(url, config);
    return response.data;
};
const getCharactersWithPage = async (token, page) => {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(`http://localhost:3000/api/characters?page=${page}&limit=4`, config);
    return response.data;

};
const getCharactersNameId = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(`http://localhost:3000/api/characters`, config);
    console.log("respuesta desde el index controller: " + response.data);
    return response.data;

};
const getEpisodiosWithId = async (token, id) => {
    const url = `http://localhost:3000/api/episodes/${id}`;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(url, config);

    return response.data;
};
const saveEpisode = async (token, newEpisode) => {

    const url = "http://localhost:3000/api/episodes";
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const envio = await axios.post(url, newEpisode, config);
        console.log("Respuesta del servidor:", envio.data);
    } catch (error) {
        console.log("error al guardar el episodio");
        if (error.response) {
            
            console.error("Status:", error.response.status);
            console.error("Datos del error:", error.response.data);
        } else if (error.request) {

            console.error("No hubo respuesta del servidor");
        } else {
    
            console.error("Error de configuración:", error.message);
        }
    }
    throw error;

};


module.exports = {
    getCharacters, getEpisodios, getCharactersWithPage, getEpisodiosWithId, getCharactersNameId, saveEpisode
};