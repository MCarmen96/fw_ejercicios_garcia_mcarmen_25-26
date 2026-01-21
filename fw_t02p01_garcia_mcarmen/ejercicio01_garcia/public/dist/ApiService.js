"use strict";
class ApiService {
    constructor() {
        this.API_KEY = "1";
        this.API_URL = "https://www.themealdb.com/api/json/v1/" + this.API_KEY;
    }
    async recetaAleatoria() {
        let receta;
        let datos;
        try {
            let respuesta = await fetch(this.API_URL + "/random.php");
            datos = await respuesta.json();
            receta = datos.meals[0]; //guardo el primer elemento y es lo que devuelvo
            return receta;
        }
        catch (error) {
            console.log("Error al obtener la receta aleatoria:");
            console.log(error);
            return null;
        }
    }
    async obtenerCategorias() {
        let datos;
        try {
            let respuesta = await fetch(this.API_URL + "/categories.php");
            datos = await respuesta.json();
            console.log(datos);
        }
        catch (error) {
            console.log("Error al obtener las catgorias:");
            console.log(error);
        }
        return datos;
    }
}
//# sourceMappingURL=ApiService.js.map