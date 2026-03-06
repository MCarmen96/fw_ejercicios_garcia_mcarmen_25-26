// *  Aquí va la lógica.
// todo Todos los métodos reciben: (req, res).
// todo Son los objetos de petición y respuesta que Express pasa automáticamente a cada ruta para gestionar la solicitud del cliente y enviar la respuesta.


/* exports.getPlaces = (req, res) => {
    res.status(200).send("Obtener places");
};

exports.createPlace = (req, res) => {
    res.status(201).send("Crear place");
};

exports.updatePlace = (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Actualizar place ${id}`);
};

exports.deletePlace = (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Eliminar place ${id}`);
}; */

exports.getPlaces = (req, res) => {
    res.status(200).json({ 
       message: "Obtener places" 
    });
};

exports.createPlace = (req, res) => {
    res.status(201).json({ message: "Crear place" });
};

exports.updatePlace = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Actualizar place ${id}` });
};

exports.deletePlace = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Eliminar place ${id}` });
};

