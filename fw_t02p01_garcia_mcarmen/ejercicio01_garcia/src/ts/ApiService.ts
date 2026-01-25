import { MyMeal } from "./MyMeal.js";
export class ApiService {
    
    API_KEY: string="1";
    API_URL: string="https://www.themealdb.com/api/json/v1/"+this.API_KEY;

    constructor(){}

    public async recetaAleatoria():Promise<MyMeal | null>{

        //let receta:MyMeal;
        let datos;

        try{

            const respuesta:Response|null=await fetch(this.API_URL+"/random.php");
            datos=await respuesta.json();

            //guardo el primer elemento dela objeto de la api
            const mealData=datos.meals[0]; 

            //array auxiliar para los ingredientes
            let ingredientes:{ name: string; measure: string }[]=[];
            //este bucle recojo los 20 ingredientes
            for (let index = 1; index < 20; index++) {
                //construyo las variables
                const nombre = mealData[`strIngredient${index}`];
                const medida = mealData[`strMeasure${index}`];

                // si el nombre existe y no esta vacio 
                if(nombre&&nombre.trim()!==""){

                    ingredientes.push({
                        name:nombre,
                        measure:medida
                    });
                }else{
                    break;
                }
            }
            return {
                idMeal:datos.meals[0].idMeal,
                strMeal:datos.meals[0].strMeal,
                strCategory:datos.meals[0].strCategory,
                strArea:datos.meals[0].strArea,
                strMealThumb:datos.meals[0].strMealThumb,
                ingredients:ingredientes
            }



        }catch(error){
            console.log("Error al obtener la receta aleatoria:",error);
            console.log(error);
            return null;
        }
        

        
    }


    public async obtenerCategorias():Promise<Category[]>{

        let datos;
        let categorias:Category[]=[];

        try{
            let respuesta:Response=await fetch(this.API_URL+"/categories.php")
            datos=await respuesta.json();
            console.log(datos)
            // si la clave categories existe y su array es mayor a 0 lo recorro
            if(datos.categories && datos.categories.lenght>0){

                datos.categories.forEach((categoria:Category)=> {
                    categorias.push({
                        idCategory:categoria.idCategory,
                        strCategory:categoria.strCategory
                    })
                });
            }

        }catch(error){
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