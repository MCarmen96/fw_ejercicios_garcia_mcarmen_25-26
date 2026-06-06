
import { Injectable, signal } from '@angular/core';
import { User } from '../model/user';
import { AuthSession } from '../model/auth-session';
import { UserMeal } from '../model/user-meal';
import { MyMeal } from '../model/my-meal';
import { UserMiniMeal } from '../model/user-mini-meal';
import { elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

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
  public isMealsSaved=signal<boolean>(false);
  public isAuthenticated = signal<boolean>(localStorage.getItem('USER_SESSION') !== null);
  private static readonly USER_KEY_ITEM: string = "users";
  private static readonly USER_MEAL_KEY_ITEM: string = "userMeals_";//Clave: userMeals_56 + el id del user
  private static readonly USER_MINI_MEAL_KEY_ITEM: string = "userMiniMeals_"// tambien con el id del usuario
  private static readonly USER_WEEKLY_PLANS: string = "weeklyPlans_";// tmabien con el id
  private static readonly USER_SESSION: string = "authSession";

  public constructor() {

    if (!localStorage.getItem(StorageService.USER_KEY_ITEM)) {
      localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify([]));
      //localStorage.setItem(StorageService.USER_SESSION, JSON.parse(''));
    }

    if(this.getMiniMeaslUser.length>0){
      this.isMealsSaved.set(true);
    }
  }

  // cojo los usuarios del local storage y los devuelvo mejor hacerlo

  getUsers(): User[] | boolean {

    const users = localStorage.getItem(StorageService.USER_KEY_ITEM);
    if (users != null) {
      return users ? JSON.parse(users) : []; // devuelvo el array
      /* La función JSON.parse() toma una cadena de texto que tiene formato JSON
      (un formato estándar para guardar e intercambiar información)
      y la transforma en un objeto o array real de JavaScript/TypeScript. */
    } else {
      return false;
    }

  }

  getMealsUser(id: number): UserMeal[] | boolean {
    const mealsUser = localStorage.getItem(StorageService.USER_MEAL_KEY_ITEM + id);

    if (mealsUser != null) {
      return mealsUser ? JSON.parse(mealsUser) : [];
    } else {
      return false;
    }
  }

  getMiniMeaslUser(): UserMiniMeal[] | boolean {
    const idUser = this.getSession()?.userId;

    if (idUser) {
      const minimeals = localStorage.getItem(StorageService.USER_MINI_MEAL_KEY_ITEM + idUser);
      return minimeals ? JSON.parse(minimeals) : [];
    }
    return false;
  }

  saveUser(user: User): boolean | User {
    let ok = true;
    let usersArray = this.getUsers();
    console.log("desde la funcion save user local->" + user.favoriteCategory)
    if (Array.isArray(usersArray)) {
      if (!this.getEmailUser(user.email)) {
        usersArray.push(user);

      } else {
        ok = false;
      }

    } else {
      ok = false;
    }
    // aqui guardo el objeto en el array
    // guardo en el local storage cogiendo la clave que e interesa que es la de users
    if (ok) {
      try {
        localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify(usersArray));//y ahora aqui lo guardo en storage sobreescribiendo
        localStorage.setItem(StorageService.USER_MEAL_KEY_ITEM + user.id, JSON.stringify([]));
        localStorage.setItem(StorageService.USER_MINI_MEAL_KEY_ITEM + user.id, JSON.stringify([]));
        localStorage.setItem(StorageService.USER_WEEKLY_PLANS + user.id, JSON.stringify([]));
      } catch (error) {
        console.error(error);
        ok = false;
      }
    }

    return ok;

  }

  getEmailUser(email: string): boolean {

    let users = this.getUsers();
    let ok = false;
    try {
      if (users && Array.isArray(users)) {
        return users.some(user => user.email === email);
      }

    } catch (error) {
      return false;
    }

    return ok;
  }

  getPasswordUser(password: string): boolean {// por que me pide el undefined???

    let users = this.getUsers();
    let ok = false;

    try {
      if (users && Array.isArray(users)) {
        return users.some(user => user.password === password);
      }

    } catch (error) {
      return false;
    }
    return ok;

  }
  getLastUser(): number {

    let user = this.getUsers();
    let id: number = 0;
    if (user && Array.isArray(user)) {// mira si hay algun user
      if (user.length == 0) {
        return 1;
      } else {
        let lastIndex = user.length - 1;//cojo el ultimo indice
        let lastUser = user[lastIndex];// accedo al objeto que esta en esa posicion
        id = lastUser.id + 1; //devuelvo su indice + 1
      }

    } else {
      console.log("fallo al recoger los datos de la clave user del localstorage");
    }
    return id;
  }

  getId(email: string): number {
    let users = this.getUsers();
    let id: number = 0;
    if (users && Array.isArray(users)) {
      users.forEach(element => {
        if (element.email == email) {
          id = element.id;
        }
      });
    }

    return id;
  }

  getOneUser(email: string): User | null {
    let users = this.getUsers();
    let userFound;

    if (users && Array.isArray(users)) {
      userFound = users.find(element => element.email === email);
    } else {
      return null;
    }

    if (userFound) {
      return userFound;
    }

    return null;
  }

  getSession(): null | AuthSession {
    const session = localStorage.getItem(StorageService.USER_SESSION);

    if (session != null) {
      return session ? JSON.parse(session) : null;
    }

    return null;
  }


  saveSession(user: User) {

    let authSessionUser: AuthSession = {
      userId: user.id,
      name: user.name,
      loginDate: new Date()
    }

    console.log("Sesion guardada: " + authSessionUser);

    try {
      localStorage.setItem(StorageService.USER_SESSION, JSON.stringify(authSessionUser));
      this.isAuthenticated.set(true);
    } catch (error) {
      console.error(error);
    }
  }


  saveCategory(category: string) {

    const sesion: AuthSession | null = this.getSession();

    if (sesion != null) {
      const usuarios = this.getUsers();
      if (Array.isArray(usuarios)) {
        const userEncontrado: User | undefined = usuarios.find(element => element.id === sesion.userId);

        if (userEncontrado) {
          const indiceUser = usuarios.findIndex(user => user.id === userEncontrado.id);
          //array.splice(indice, cuantosElementosBorrar)
          usuarios.splice(indiceUser, 1);
          userEncontrado.favoriteCategory = category;

          usuarios.push(userEncontrado);
          localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify(usuarios));
        }
      }

    }
  }

  searchUserXid(id: number) {

    let users = this.getUsers();

    if (Array.isArray(users) && users) {

    }

  }

  saveCommentMeal(id: number, comentario: UserMeal): boolean {

    const mealUser = this.getMealsUser(id);
    if (Array.isArray(mealUser)) {
      mealUser.push(comentario);
      try {
        localStorage.setItem(StorageService.USER_MEAL_KEY_ITEM + id, JSON.stringify(mealUser));
        return true;
      } catch (error: any) {
        console.log("Error al guardar comentario receta....");
        return false;
      }

    }

    return false;

  }

  guardarReceta(meal: UserMiniMeal): boolean {
    const miniMeals = this.getMiniMeaslUser();

    if (miniMeals && Array.isArray(miniMeals)) {
      miniMeals.push(meal);
    }
    try {
      localStorage.setItem(StorageService.USER_MINI_MEAL_KEY_ITEM + this.getSession()?.userId, JSON.stringify(miniMeals));
      this.isMealsSaved.set(true);
      return true;
    } catch (error: any) {
      console.log("Error al guardar la receta en local storage....");
      return false;
    }

    return false;
  }

  quitarRecetaGuardada(id: number) {
    let meals = this.getMiniMeaslUser();
    if (Array.isArray(meals) && meals) {
      const indiceReceta = meals.findIndex(meal => Number(meal.id) === id);

      // Si da diferente de -1 es que la receta existe en la lista
      if (indiceReceta !== -1) {
        meals.splice(indiceReceta, 1);
        localStorage.setItem(StorageService.USER_MINI_MEAL_KEY_ITEM+this.getSession()?.userId, JSON.stringify(meals));
      }
    }

  }

  searchMiniMeal(id:number):boolean{
    const meals=this.getMiniMeaslUser();
    if(meals&&Array.isArray(meals)){
      const mealEncontrada:UserMiniMeal|undefined=meals.find(element=>Number(element.id)==id);
      if(mealEncontrada){
        return true;
      }
    }
    return false;
  }

  logout() {
    if (this.getSession() != null) {
      localStorage.removeItem(StorageService.USER_SESSION);
      this.isAuthenticated.set(false);
    }
  }

}
