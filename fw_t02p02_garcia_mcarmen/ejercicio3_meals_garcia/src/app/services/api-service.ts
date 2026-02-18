import { Injectable } from '@angular/core';
import { MyMeal } from '../model/my-meal'; // importo la interfaz
import { Category } from '../model/category';


@Injectable({
  providedIn: 'root',
})

// * Obtener recetas aleatorias (con o sin categoría)
// Obtener recetas por ingrediente
// Obtener detalles completos de una receta
// * Obtener categorías disponibles

export class ApiService  {

  API_KEY: string = "1";
  API_URL: string = "https://www.themealdb.com/api/json/v1/" + this.API_KEY;

  public async getMeals(): Promise<MyMeal | null> {

        //let receta:MyMeal;
        let datos;

        try {

            const respuesta: Response | null = await fetch(this.API_URL + "/random.php");
            datos = await respuesta.json();

            //guardo el primer elemento dela objeto de la api
            const mealData = datos.meals[0];

            //array auxiliar para los ingredientes
            let ingredientes: { name: string; measure: string }[] = [];
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
                } else {
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
            }



        } catch (error) {
            console.log("Error al obtener la receta aleatoria:", error);
            console.log(error);
            return null;
        }



    }

    public async getCategorys(): Promise<Category[]> {

        let datos;
        let categorias:Category[] = [];

        try {
            let respuesta: Response = await fetch(this.API_URL + "/categories.php")
            datos = await respuesta.json();
            //console.log("categorias: ", datos)
            // si la clave categories existe y su array es mayor a 0 lo recorro
            if (datos.categories && datos.categories.length > 0) {

                datos.categories.forEach((categoria:Category) => {
                    categorias.push({
                        idCategory: categoria.idCategory,
                        strCategory: categoria.strCategory
                    })
                });
            }

        } catch (error) {
            console.log("Error al obtener las catgorias:");
            console.log(error);
        }
        return categorias;
    }

    public async getMealsForCategorys(categoria: string): Promise<any[]> {

        const respuesta = await fetch(`${this.API_URL}/filter.php?c=${categoria}`);
        const datos = await respuesta.json();
        return datos.meals; // Esto devuelve una lista de recetas (solo con nombre, ID y foto)
    }

    public async getMealForId(id: string): Promise<MyMeal | null> {

        try {
            const respuesta = await fetch(`${this.API_URL}/lookup.php?i=${id}`);
            const datos = await respuesta.json();
            const mealData = datos.meals[0];

            // Aquí aplicas la misma lógica de los ingredientes que ya tienes
            // en tu función recetaAleatoria()
            let ingredientes: { name: string; measure: string }[] = [];
            for (let i = 1; i <= 20; i++) {
                const nombre = mealData[`strIngredient${i}`];
                const medida = mealData[`strMeasure${i}`];
                if (nombre && nombre.trim() !== "") {
                    ingredientes.push({ name: nombre, measure: medida });
                }
            }

            return {
                idMeal: mealData.idMeal,
                strMeal: mealData.strMeal,
                strCategory: mealData.strCategory,
                strArea: mealData.strArea,
                strMealThumb: mealData.strMealThumb,
                ingredients: ingredientes
            };
        } catch (error) {
            return null;
        }
    }


}


