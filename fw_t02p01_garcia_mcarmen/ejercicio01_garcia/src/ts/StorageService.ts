import { error } from './../../../../fw_t02p02_garcia_mcarmen/mi_app_03/node_modules/ajv/lib/vocabularies/applicator/dependencies';

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

    // cojo los usuarios del local storage y los devuelvo mejor hacerlo
    getUsers():User[]{

        const users= localStorage.getItem(StorageService.USER_KEY_ITEM);
        return users ? JSON.parse(users):[]; // devuelvo el array 
    }
    
    saveUser(user:User){

        let usersArray=this.getUsers();
        usersArray.push(user);// aqui guardo el objeto en el array
        localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify(usersArray));//y ahoara aqui lo guardo en storage
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

    getLastUser(){

        let user=this.getUsers();

        if(user.length>0){// mira si hay algun user

            let lastIndex=user.length-1;//cojo el ultimo indice
            let lastUser=user[lastIndex];// accedo al objeto que esta en esa posicion
            return lastUser.id+1; //devuelvo su indice + 1 

        }else{
            return 1;
        }
    }

    getPasswordUser(password:string):boolean|null{

        let users:User[]=this.getUsers();
        try{
            return users.some(user=>user.password===password);
        }catch(error){
            return false;
        }
    }
        
    


}