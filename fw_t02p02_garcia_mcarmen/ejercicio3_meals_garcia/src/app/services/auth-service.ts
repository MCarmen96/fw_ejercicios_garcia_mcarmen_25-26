
import { inject, Injectable } from '@angular/core';
import { StorageService } from '../services/storage-service';
import { User } from '../model/user';
import { AuthSession } from '../model/auth-session';
import { UserMeal } from '../model/user-meal';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public local=inject(StorageService);

  authLogin(email:string){
    let user = this.local.getOneUser(email);
    if (user != null) {
        this.local.saveSession(user);
    }

  }

  authRegister(user:User):boolean|User{
    if(user!=null){
        return this.local.saveUser(user);
    }
    return false;
  }

  getLastUser():number{
    const id:number=this.local.getLastUser();
    return id;
  }

  isSession():null|AuthSession{
    return this.local.getSession();
  }


  saveCommentMeal(comentario:UserMeal):boolean{

    if(!this.isSession()){return false}
    let id=Number(this.isSession()?.userId);
    this.local.saveCommentMeal(id,comentario);
    return true;
  }

}

/*
  AuthService será el servicio responsable de gestionar la autenticación del usuario en la aplicación. No representa datos, gestiona estado y comportamiento:
    iniciar sesión
    cerrar sesión
    comprobar si hay un usuario autenticado
    recuperar la sesión almacenada

  AuthSession será la clase que representa una sesión autenticada. También puede ser una interfaz ahora que pasamos toda la lógica a AuthService.
    No contiene lógica de aplicación
    No accede a localStorage

*/

