const indexService = require('../services/indexService');
const authService = require('../services/authService');
/**
 * Renderiza la página de inicio con los personajes obtenidos del servicio.
 */
const renderIndex = async (req, res) => {
    try {

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

const renderCreateEpisode = async (req, res) => {
    try {
        const token = await authService.getToken();
        const datos = await indexService.getCharactersNameId(token);
        const datosNecesarios = [];

        datos.data.forEach(element => {
            datosNecesarios.push({ "id": element._id, "name": element.name, "img": element.img });
        });
        console.log("Datos necesarios: " + datosNecesarios);

        const message = req.query.message || null;
        const error = req.query.error || null;
        console.log("error->"+error);
        console.log("mensaje->"+message);

        res.render('createEpisode', {
            title: 'Express con Token Dinámico',
            characters: datosNecesarios,
            message,
            error,

        });

    } catch (error) {
        console.error("Error en el flujo de petición:", error.message);
        res.status(500).render('error', { mensaje: 'Error al procesar la petición con el token' });
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


    } catch (error) {
        console.error("Error en el flujo de petición:", error.message);
        res.status(500).render('error', { mensaje: 'Error al procesar la petición con el token' });
    }

}

const dataEpisodes = async (req, res) => {

    const token = await authService.getToken();
    const { id } = req.params;
    const data = await indexService.getEpisodiosWithId(token, id);
    res.json(data);
}

const createEpisode = async (req, res) => {
    try {
        const token = await authService.getToken();
        const { title, code, year, characterIds, summary } = req.body;

        let arrayCharacterIds = [];
        //characterIds puede ser: undefined, string o un array
        if (typeof characterIds === "string") {
            //si es string porque solo haya uno
            arrayCharacterIds = [characterIds];
        } else if (characterIds) {
            // si no es undefinned
            arrayCharacterIds = characterIds;
        }

        console.log(title);
        console.log(code);
        console.log(year);
        console.log(summary);
        console.log("IDs recibidos del formulario:", characterIds);
        
        const newEpisode = {
            code: code,
            title: title,
            summary: summary,
            year: Number(year),
            characters: arrayCharacterIds,
        };

        console.log(newEpisode);

        let peticion = await indexService.saveEpisode(token, newEpisode);
        if (peticion) {
            res.redirect('/createEpisode?message=ok');
        }
    } catch (error) {
        //res.redirect('/create-episode?error=true');
        console.error(error);
        res.redirect('/createEpisode?error=true');
    }
};

const deleteEpisode = async (req, res) => {

    const token = await authService.getToken();
    const { id } = req.params;
    try{
         await indexService.deleteEpisode(token, id);
        res.status(200).send();
    }catch(error){
        console.log("error desde el index controller-> "+error);
        res.status(500).send();
    }
    

}

module.exports = {
    renderIndex, renderEpisodios, dataCharacters, dataEpisodes, renderCreateEpisode, createEpisode, deleteEpisode
};