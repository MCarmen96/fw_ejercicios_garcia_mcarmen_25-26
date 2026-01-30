
import { User } from "./User";

export class StorageService{
    /*
            USER_KEY_ITEM, USER_MEAL_KEY_ITEM, …

            Responsabilidades
            Alta y validación de usuarios
            Gestión de sesión
            Guardar y recuperar recetas del usuario
            Guardar y recuperar planes semanales
            Guardar preferencias del usuario
            …

            Nunca toca el DOM
    */

    private static readonly USER_KEY_ITEM:string="users";
    private static readonly USER_MEAL_KEY_ITEM:string="userMeals_";//Clave: userMeals_56 + el id del user
    private static readonly USER_MINI_MEAL_KEY_ITEM:string="userMiniMeals_"// tambien con el id del usuario
    private static readonly USER_WEEKLY_PLANS:string="weeklyPlans_";// tmabien con el id

    
    saveUser(user:User){

        localStorage.setItem(StorageService.USER_KEY_ITEM,JSON.stringify(user));

    }

    getEmailUser(email:string) : boolean | null{

        const usersDatos=localStorage.getItem(StorageService.USER_KEY_ITEM);//DEVUELVE EL VALOR DE LA CLAVE USER EN STRING
        
        if(!usersDatos){return false;}//si no esta esa clave

        try{
            const userList:User[]=JSON.parse(usersDatos);// convierto el texto en un array de objetos user
            console.log(userList);
            return userList.some(user=>user.email===email);
        }catch(error){

            return false;
        }
    }
        
        


}