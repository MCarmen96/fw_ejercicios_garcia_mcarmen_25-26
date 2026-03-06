const { default: mongoose } = require("mongoose");
const Episode = require("../models/episode.model");

//Product.find() devuelve una promesa, por eso usamos async/await. Si no hay datos, devolverá [].
const getAllEpisodies= async (req, res) => {
    try {
        console.log("entro en el get all episode")
        const episode = await Episode.find();
        res.status(200).json(episode);
        console.log(episode)
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los episode",
        });

    }
};
const getEpisodiesById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        // mirar que devulev el finById()
        const episode= await Episode.findById(id);
        if (!episode) {
            return res.status(404).json({ error: "Episode no encontrado" });
        }

        res.status(200).json(episode);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createEpisodies = async (req, res) => {

    const { code,title,summary,year,characters } = req.body;

    if (!title || code === undefined || summary === undefined) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios:code,title,summary,year'
        });
    }
    //haccer funcion de bucar personaje por nombre©
    if (typeof year !== 'number' || year < 0) {
        return res.status(400).json({ error: 'year debe ser un número positivo' });
    }

    try {
        const newEpisodie = await Episode.create(req.body);
        res.status(201).json(newEpisodie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEpisodies= async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Episode.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        /* 'before' → devuelve el documento antes de actualizar.
        'after' → devuelve el documento ya actualizado. */

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteEpisodies = async (req, res) => {
    try {
        const { id } = req.params;

        await Episode.findByIdAndDelete(id);

        res.status(200).json({ message: "Episodio eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllEpisodies, getEpisodiesById, createEpisodies, updateEpisodies, deleteEpisodies };