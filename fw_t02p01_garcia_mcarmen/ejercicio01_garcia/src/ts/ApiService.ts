class ApiService {
    
    API_KEY: string="1";
    API_URL: string="https://www.themealdb.com/api/json/v1/"+this.API_KEY;

    constructor(){}

    public async recetaAleatoria():Promise<MyMeal | null>{

        let receta:MyMeal;
        let datos;

        try{

            let respuesta:Response=await fetch(this.API_URL+"/random.php");
            datos=await respuesta.json();
            receta=datos.meals[0];//guardo el primer elemento y es lo que devuelvo
            return receta;
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