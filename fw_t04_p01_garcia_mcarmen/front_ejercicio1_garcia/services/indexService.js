const axios = require('axios');

/**
 * Servicio para obtener personajes de la API externa.
 * @param {number} page - Número de página.
 * @param {number} limit - Límite de elementos.
 * @returns {Promise<Object>} Datos de la respuesta de la API.
 */

const getCharacters = async (token, page=1) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(`http://localhost:3000/api/characters?page=${page}&limit=4`, config);
    return response.data;
};


const getEpisodios=async(token)=>{

    const url="http://localhost:3000/api/episodes";
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

     const response = await axios.get(url, config);
    return response.data;
};

const getCharactersWithPage=async (token,page)=>{

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(`http://localhost:3000/api/characters?page=${page}&limit=4`,config);
    return response.data;

}

const getEpisodiosWithId=async(token,id)=>{
    const url=`http://localhost:3000/api/episodes/${id}`;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    console.log("url=> "+url)
    //const response=await axios.get(url,config);
    const response =null;
    console.log("desde el index service: "+response.status);
    
    return response;

}
module.exports = {
    getCharacters,getEpisodios,getCharactersWithPage,getEpisodiosWithId
};