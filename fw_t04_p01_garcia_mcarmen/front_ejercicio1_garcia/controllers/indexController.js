const indexService = require('../services/indexService');
const authService = require('../services/authService');
/**
 * Renderiza la página de inicio con los personajes obtenidos del servicio.
 */
const renderIndex = async (req, res) => {
    try {
        console.log("entrando en render index");
        // 1. Recibimos el token directamente del servicio de auth
        const token = await authService.getToken();
        //console.log("Token recibido con éxito");

        // 2. Pasamos ese token al servicio de personajes
        const data = await indexService.getCharacters(token, 1);

        // 3. Renderizamos
        res.render('index', {
            title: 'Express con Token Dinámico',
            characters: data.data,
            paginas: data.pagination.totalPages
        });

    } catch (error) {
        console.error("Error en el flujo de petición:", error.message);
        res.status(500).render('error', { mensaje: 'Error al procesar la petición con el token' });
    }
};

const renderEpisodios = async (req, res, net) => {


    try {
        const token = await authService.getToken();
        const data = await indexService.getEpisodios(token);
        const episode = data.data;
        //console.log(episode);
        res.render('episodios', {
            title: 'Express',
            episodes: episode,

        });
    } catch (error) {
        console.error("Error en indexController:", error.message);
        res.status(500).render('error', {
            mensaje: 'Error al obtener episodios'
        });
    }
};

const dataCharacters = async (req, res) => {
    try {
         console.log("entro en el dataCharacters")
        const token = await authService.getToken();
        const { page } = req.query;
        const data = await indexService.getCharactersWithPage(token, page);
        //console.log("DATOS DEDES DEL DATA CHARACTERS: "+data.data);
        
        res.json(data);


    }catch(error){
        console.error("Error en el flujo de petición:", error.message);
        res.status(500).render('error', { mensaje: 'Error al procesar la petición con el token' });
    }
  
}

const dataEpisodes=async(req,res)=>{
    console.log("----------entro en el dataEpisodes----------");
        const token = await authService.getToken();
        const { id } = req.params;
        const data=await indexService.getEpisodiosWithId(token,id);

        console.log("DATOS DESDE EL DATA EPISODES WITH ID "+ data.data);
        res.json(data);
}

module.exports = {
    renderIndex, renderEpisodios, dataCharacters,dataEpisodes
};