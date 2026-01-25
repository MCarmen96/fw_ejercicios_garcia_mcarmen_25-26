import { MyMeal } from "./MyMeal.js";
export class ApiService {
    
    API_KEY: string="1";
    API_URL: string="https://www.themealdb.com/api/json/v1/"+this.API_KEY;

    constructor(){}

    public async recetaAleatoria():Promise<MyMeal | null>{

        //let receta:MyMeal;
        let datos;

        try{

            let respuesta:Response=await fetch(this.API_URL+"/random.php");
            datos=await respuesta.json();
            //receta=datos.meals[0];//guardo el primer elemento y es lo que devuelvo pero 

            const mealData=datos.meals[0];
            let ingredientes:{ name: string; measure: string }[]=[];

            for (let index = 1; index < 20; index++) {
                //construyo las variables
                const nombre = mealData[`strIngredient${index}`];
                const medida = mealData[`strMeasure${index}`];
                // si el nombre esta no esta vacio 
                if(nombre&&nombre.trim()!==""){
                    ingredientes.push({
                        name:nombre,
                        
                    });
                }
            }
            return {
                idMeal:datos.meals[0].idMeal,
                strMeal:datos.meals[0].strMeal,
                strCategory:datos.meals[0].strCategory,
                strArea:datos.meals[0].strArea,
                strMealThumb:datos.meals[0].strMealThumb
            }



        }catch(error){
            console.log("Error al obtener la receta aleatoria:");
            console.log(error);
            return null;
        }
        

        
    }


    public async obtenerCategorias():Promise<Category[]>{
        let datos;
        
        try{
            let respuesta:Response=await fetch(this.API_URL+"/categories.php")
            datos=await respuesta.json();
            console.log(datos)

        }catch(error){
            console.log("Error al obtener las catgorias:");
            console.log(error);
        }
        return datos;
    }
}