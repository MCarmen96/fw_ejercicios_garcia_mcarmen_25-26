import { User } from "./User";
import { StorageService } from "./StorageService";
class AuthSession{
    //  Representa la sesión del usuario autenticado. Clase muy simple, también podría ser una interfaz.
    private userId:number;
    private name:string;
    private loginDate:Date;

    saveSession(user:User,local:StorageService){
        
    }

}