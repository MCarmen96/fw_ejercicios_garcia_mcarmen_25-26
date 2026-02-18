import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

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

