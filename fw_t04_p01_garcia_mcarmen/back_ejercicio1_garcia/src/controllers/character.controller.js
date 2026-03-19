const { default: mongoose } = require("mongoose");
const Character = require("../models/character.model");

//Product.find() devuelve una promesa, por eso usamos async/await. Si no hay datos, devolverá [].
const getAllCharacters = async (req, res) => {
    try {
        const { page, limit } = req.query;
        let characters;
        let total = await Character.countDocuments();
        if (limit) {
            const pageNumber = parseInt(page) || 1;
            const limitNumber = parseInt(limit);
            const skip = (pageNumber - 1) * limitNumber;
            characters = await Character.find().skip(skip).limit(limitNumber);
            return res.status(200).json({
                data: characters,
                pagination: {
                    total,
                    page: pageNumber,
                    limit: limitNumber,
                    totalPages: Math.ceil(total / limitNumber)
                }
            });
        }

        console.log("entro en el get all characters");
        //si no hay limite devolvemos todo
        characters = await Character.find();
        res.status(200).json({
            data:characters,
            total
        });
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
        // mirar que devuleve el finById()
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

    /*  const { name, age, species, role } = req.body;
     if (!name || species === undefined || role === undefined) {
         return res.status(400).json({
             error: 'Faltan campos obligatorios: name, species,role'
         });
     }
     if (typeof age !== 'number' || age < 0) {
         return res.status(400).json({ error: 'age debe ser un número positivo' });
     } */

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

/* async function validateObjetId(arrayCharacters){
    const valid=false;
    arrayCharacters.forEach(element => {
        if(Character.findById(element)){
            valid=true;
        }else{
            valid=false;
        }
    
    });
    
} */

module.exports = { getAllCharacters, getCharactersById, createCharacter, updateCharacter, deleteCharacter};