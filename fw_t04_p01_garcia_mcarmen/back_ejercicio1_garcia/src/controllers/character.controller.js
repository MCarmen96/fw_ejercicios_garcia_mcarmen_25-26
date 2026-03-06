const { default: mongoose } = require("mongoose");
const Character = require("../models/character.model");

//Product.find() devuelve una promesa, por eso usamos async/await. Si no hay datos, devolverá [].
const getAllCharacters = async (req, res) => {
    try {
        console.log("entro en el get all characters")
        const characters = await Character.find();
        res.status(200).json(characters);
        console.log(characters)
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los personajes",
        });

    }
};
const getCharactersById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        // mirar que devulev el finById()
        const character = await Character.findById(id);
        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }

        res.status(200).json(character);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createCharacter = async (req, res) => {

    const { name, age, species, role } = req.body;
    if (!name || species === undefined || role === undefined) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios: name, species,role'
        });
    }
    if (typeof age !== 'number' || age < 0) {
        return res.status(400).json({ error: 'age debe ser un número positivo' });
    }

    try {
        const newCharacter = await Character.create(req.body);
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Character.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        /* 'before' → devuelve el documento antes de actualizar.
        'after' → devuelve el documento ya actualizado. */

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;

        await Character.findByIdAndDelete(id);

        res.status(200).json({ message: "Personaje eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCharacters, getCharactersById, createCharacter, updateCharacter, deleteCharacter };