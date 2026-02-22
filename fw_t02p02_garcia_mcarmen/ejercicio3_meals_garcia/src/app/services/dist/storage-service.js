"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StorageService = void 0;
var core_1 = require("@angular/core");
var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    StorageService_1 = StorageService;
    // cojo los usuarios del local storage y los devuelvo mejor hacerlo
    StorageService.prototype.getUsers = function () {
        var users = localStorage.getItem(StorageService_1.USER_KEY_ITEM);
        return users ? JSON.parse(users) : []; // devuelvo el array
    };
    StorageService.prototype.saveUser = function (user) {
        var usersArray = this.getUsers();
        usersArray.push(user); // aqui guardo el objeto en el array
        localStorage.setItem(StorageService_1.USER_KEY_ITEM, JSON.stringify(usersArray)); //y ahoara aqui lo guardo en storage
    };
    StorageService.prototype.getEmailUser = function (email) {
        var usersDatos = localStorage.getItem(StorageService_1.USER_KEY_ITEM); //DEVUELVE EL VALOR DE LA CLAVE USER EN STRING
        if (!usersDatos) {
            return false;
        } //si no esta esa clave
        try {
            var userList = JSON.parse(usersDatos); // convierto el texto en un array de objetos user
            console.log(userList);
            return userList.some(function (user) { return user.email === email; });
        }
        catch (error) {
            return false;
        }
    };
    StorageService.prototype.getLastUser = function () {
        var user = this.getUsers();
        if (user.length > 0) { // mira si hay algun user
            var lastIndex = user.length - 1; //cojo el ultimo indice
            var lastUser = user[lastIndex]; // accedo al objeto que esta en esa posicion
            return lastUser.id + 1; //devuelvo su indice + 1
        }
        else {
            return 1;
        }
    };
    StorageService.prototype.getPasswordUser = function (password) {
        var users = this.getUsers();
        try {
            return users.some(function (user) { return user.password === password; });
        }
        catch (error) {
            return false;
        }
    };
    var StorageService_1;
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
    StorageService.USER_KEY_ITEM = "users";
    StorageService.USER_MEAL_KEY_ITEM = "userMeals_"; //Clave: userMeals_56 + el id del user
    StorageService.USER_MINI_MEAL_KEY_ITEM = "userMiniMeals_"; // tambien con el id del usuario
    StorageService.USER_WEEKLY_PLANS = "weeklyPlans_"; // tmabien con el id
    StorageService = StorageService_1 = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
