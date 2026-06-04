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
        this.isAuthenticated = core_1.signal(localStorage.getItem('USER_SESSION') !== null);
        if (!localStorage.getItem(StorageService_1.USER_KEY_ITEM)) {
            localStorage.setItem(StorageService_1.USER_KEY_ITEM, JSON.stringify([]));
            //localStorage.setItem(StorageService.USER_SESSION, JSON.parse(''));
        }
    }
    StorageService_1 = StorageService;
    // cojo los usuarios del local storage y los devuelvo mejor hacerlo
    StorageService.prototype.getUsers = function () {
        var users = localStorage.getItem(StorageService_1.USER_KEY_ITEM);
        if (users != null) {
            return users ? JSON.parse(users) : []; // devuelvo el array
            /* La función JSON.parse() toma una cadena de texto que tiene formato JSON
            (un formato estándar para guardar e intercambiar información)
            y la transforma en un objeto o array real de JavaScript/TypeScript. */
        }
        else {
            return false;
        }
    };
    StorageService.prototype.getMealsUser = function (id) {
        var mealsUser = localStorage.getItem(StorageService_1.USER_MEAL_KEY_ITEM + id);
        if (mealsUser != null) {
            return mealsUser ? JSON.parse(mealsUser) : [];
        }
        else {
            return false;
        }
    };
    StorageService.prototype.getMiniMeaslUser = function () {
        var _a;
        var idUser = (_a = this.getSession()) === null || _a === void 0 ? void 0 : _a.userId;
        if (idUser) {
            var minimeals = localStorage.getItem(StorageService_1.USER_MINI_MEAL_KEY_ITEM + idUser);
            return minimeals ? JSON.parse(minimeals) : [];
        }
        return false;
    };
    StorageService.prototype.saveUser = function (user) {
        var ok = true;
        var usersArray = this.getUsers();
        console.log("desde la funcion save user local->" + user.favoriteCategory);
        if (Array.isArray(usersArray)) {
            if (!this.getEmailUser(user.email)) {
                usersArray.push(user);
            }
            else {
                ok = false;
            }
        }
        else {
            ok = false;
        }
        // aqui guardo el objeto en el array
        // guardo en el local storage cogiendo la clave que e interesa que es la de users
        if (ok) {
            try {
                localStorage.setItem(StorageService_1.USER_KEY_ITEM, JSON.stringify(usersArray)); //y ahora aqui lo guardo en storage sobreescribiendo
                localStorage.setItem(StorageService_1.USER_MEAL_KEY_ITEM + user.id, JSON.stringify([]));
                localStorage.setItem(StorageService_1.USER_MINI_MEAL_KEY_ITEM + user.id, JSON.stringify([]));
                localStorage.setItem(StorageService_1.USER_WEEKLY_PLANS + user.id, JSON.stringify([]));
            }
            catch (error) {
                console.error(error);
                ok = false;
            }
        }
        return ok;
    };
    StorageService.prototype.getEmailUser = function (email) {
        var users = this.getUsers();
        var ok = false;
        try {
            if (users && Array.isArray(users)) {
                return users.some(function (user) { return user.email === email; });
            }
        }
        catch (error) {
            return false;
        }
        return ok;
    };
    StorageService.prototype.getPasswordUser = function (password) {
        var users = this.getUsers();
        var ok = false;
        try {
            if (users && Array.isArray(users)) {
                return users.some(function (user) { return user.password === password; });
            }
        }
        catch (error) {
            return false;
        }
        return ok;
    };
    StorageService.prototype.getLastUser = function () {
        var user = this.getUsers();
        var id = 0;
        if (user && Array.isArray(user)) { // mira si hay algun user
            if (user.length == 0) {
                return 1;
            }
            else {
                var lastIndex = user.length - 1; //cojo el ultimo indice
                var lastUser = user[lastIndex]; // accedo al objeto que esta en esa posicion
                id = lastUser.id + 1; //devuelvo su indice + 1
            }
        }
        else {
            console.log("fallo al recoger los datos de la clave user del localstorage");
        }
        return id;
    };
    StorageService.prototype.getId = function (email) {
        var users = this.getUsers();
        var id = 0;
        if (users && Array.isArray(users)) {
            users.forEach(function (element) {
                if (element.email == email) {
                    id = element.id;
                }
            });
        }
        return id;
    };
    StorageService.prototype.getOneUser = function (email) {
        var users = this.getUsers();
        var userFound;
        if (users && Array.isArray(users)) {
            userFound = users.find(function (element) { return element.email === email; });
        }
        else {
            return null;
        }
        if (userFound) {
            return userFound;
        }
        return null;
    };
    StorageService.prototype.getSession = function () {
        var session = localStorage.getItem(StorageService_1.USER_SESSION);
        if (session != null) {
            return session ? JSON.parse(session) : null;
        }
        return null;
    };
    StorageService.prototype.saveSession = function (user) {
        var authSessionUser = {
            userId: user.id,
            name: user.name,
            loginDate: new Date()
        };
        console.log("Sesion guardada: " + authSessionUser);
        try {
            localStorage.setItem(StorageService_1.USER_SESSION, JSON.stringify(authSessionUser));
            this.isAuthenticated.set(true);
        }
        catch (error) {
            console.error(error);
        }
    };
    StorageService.prototype.saveCategory = function (category) {
        var sesion = this.getSession();
        if (sesion != null) {
            var usuarios = this.getUsers();
            if (Array.isArray(usuarios)) {
                var userEncontrado_1 = usuarios.find(function (element) { return element.id === sesion.userId; });
                if (userEncontrado_1) {
                    var indiceUser = usuarios.findIndex(function (user) { return user.id === userEncontrado_1.id; });
                    //array.splice(indice, cuantosElementosBorrar)
                    usuarios.splice(indiceUser, 1);
                    userEncontrado_1.favoriteCategory = category;
                    usuarios.push(userEncontrado_1);
                    localStorage.setItem(StorageService_1.USER_KEY_ITEM, JSON.stringify(usuarios));
                }
            }
        }
    };
    StorageService.prototype.searchUserXid = function (id) {
        var users = this.getUsers();
        if (Array.isArray(users) && users) {
        }
    };
    StorageService.prototype.saveCommentMeal = function (id, comentario) {
        var mealUser = this.getMealsUser(id);
        if (Array.isArray(mealUser)) {
            mealUser.push(comentario);
            try {
                localStorage.setItem(StorageService_1.USER_MEAL_KEY_ITEM + id, JSON.stringify(mealUser));
                return true;
            }
            catch (error) {
                console.log("Error al guardar comentario receta....");
                return false;
            }
        }
        return false;
    };
    StorageService.prototype.guardarReceta = function (meal) {
        var _a;
        var miniMeals = this.getMiniMeaslUser();
        if (miniMeals && Array.isArray(miniMeals)) {
            miniMeals.push(meal);
        }
        try {
            localStorage.setItem(StorageService_1.USER_MINI_MEAL_KEY_ITEM + ((_a = this.getSession()) === null || _a === void 0 ? void 0 : _a.userId), JSON.stringify(miniMeals));
            return true;
        }
        catch (error) {
            console.log("Error al guardar la receta en local storage....");
            return false;
        }
        return false;
    };
    StorageService.prototype.quitarRecetaGuardada = function (id) {
        var _a;
        var meals = this.getMiniMeaslUser();
        if (Array.isArray(meals) && meals) {
            var indiceReceta = meals.findIndex(function (meal) { return Number(meal.id) === id; });
            // Si da diferente de -1 es que la receta existe en la lista
            if (indiceReceta !== -1) {
                meals.splice(indiceReceta, 1);
                localStorage.setItem(StorageService_1.USER_MINI_MEAL_KEY_ITEM + ((_a = this.getSession()) === null || _a === void 0 ? void 0 : _a.userId), JSON.stringify(meals));
            }
        }
    };
    StorageService.prototype.logout = function () {
        if (this.getSession() != null) {
            localStorage.removeItem(StorageService_1.USER_SESSION);
            this.isAuthenticated.set(false);
        }
    };
    var StorageService_1;
    StorageService.USER_KEY_ITEM = "users";
    StorageService.USER_MEAL_KEY_ITEM = "userMeals_"; //Clave: userMeals_56 + el id del user
    StorageService.USER_MINI_MEAL_KEY_ITEM = "userMiniMeals_"; // tambien con el id del usuario
    StorageService.USER_WEEKLY_PLANS = "weeklyPlans_"; // tmabien con el id
    StorageService.USER_SESSION = "authSession";
    StorageService = StorageService_1 = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
