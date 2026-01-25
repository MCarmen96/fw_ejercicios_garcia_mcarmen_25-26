export class ApiService {
    constructor() {
        this.API_KEY = "1";
        this.API_URL = "https://www.themealdb.com/api/json/v1/" + this.API_KEY;
    }
    async recetaAleatoria() {
        //let receta:MyMeal;
        let datos;
        try {
            const respuesta = await fetch(this.API_URL + "/random.php");
            datos = await respuesta.json();
            //guardo el primer elemento dela objeto de la api
            const mealData = datos.meals[0];
            //array auxiliar para los ingredientes
            let ingredientes = [];
            //este bucle recojo los 20 ingredientes
            for (let index = 1; index < 20; index++) {
                //construyo las variables
                const nombre = mealData[`strIngredient${index}`];
                const medida = mealData[`strMeasure${index}`];
                // si el nombre existe y no esta vacio 
                if (nombre && nombre.trim() !== "") {
                    ingredientes.push({
                        name: nombre,
                        measure: medida
                    });
                }
                else {
                    break;
                }
            }
            return {
                idMeal: datos.meals[0].idMeal,
                strMeal: datos.meals[0].strMeal,
                strCategory: datos.meals[0].strCategory,
                strArea: datos.meals[0].strArea,
                strMealThumb: datos.meals[0].strMealThumb,
                ingredients: ingredientes
            };
        }
        catch (error) {
            console.log("Error al obtener la receta aleatoria:", error);
            console.log(error);
            return null;
        }
    }
    async obtenerCategorias() {
        let datos;
        let categorias = [];
        try {
            let respuesta = await fetch(this.API_URL + "/categories.php");
            datos = await respuesta.json();
            console.log(datos);
            // si la clave categories existe y su array es mayor a 0 lo recorro
            if (datos.categories && datos.categories.lenght > 0) {
                datos.categories.forEach((categoria) => {
                    categorias.push({
                        idCategory: categoria.idCategory,
                        strCategory: categoria.strCategory
                    });
                });
            }
        }
        catch (error) {
            console.log("Error al obtener las catgorias:");
            console.log(error);
        }
        return categorias;
    }
}
// * Obtener recetas aleatorias (con o sin categoría)
// Obtener recetas por ingrediente
// Obtener detalles completos de una receta
// * Obtener categorías disponibles 
//# sourceMappingURL=ApiService.js.map