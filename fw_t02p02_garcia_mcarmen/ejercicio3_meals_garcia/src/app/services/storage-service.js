var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Injectable } from '@angular/core';
let StorageService = (() => {
    let _classDecorators = [Injectable({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StorageService = _classThis = class {
        // cojo los usuarios del local storage y los devuelvo mejor hacerlo
        getUsers() {
            const users = localStorage.getItem(StorageService.USER_KEY_ITEM);
            return users ? JSON.parse(users) : []; // devuelvo el array
        }
        saveUser(user) {
            let usersArray = this.getUsers();
            usersArray.push(user); // aqui guardo el objeto en el array
            localStorage.setItem(StorageService.USER_KEY_ITEM, JSON.stringify(usersArray)); //y ahoara aqui lo guardo en storage
        }
        getEmailUser(email) {
            const usersDatos = localStorage.getItem(StorageService.USER_KEY_ITEM); //DEVUELVE EL VALOR DE LA CLAVE USER EN STRING
            if (!usersDatos) {
                return false;
            } //si no esta esa clave
            try {
                const userList = JSON.parse(usersDatos); // convierto el texto en un array de objetos user
                console.log(userList);
                return userList.some(user => user.email === email);
            }
            catch (error) {
                return false;
            }
        }
        getLastUser() {
            let user = this.getUsers();
            if (user.length > 0) { // mira si hay algun user
                let lastIndex = user.length - 1; //cojo el ultimo indice
                let lastUser = user[lastIndex]; // accedo al objeto que esta en esa posicion
                return lastUser.id + 1; //devuelvo su indice + 1
            }
            else {
                return 1;
            }
        }
        getPasswordUser(password) {
            let users = this.getUsers();
            try {
                return users.some(user => user.password === password);
            }
            catch (error) {
                return false;
            }
        }
    };
    __setFunctionName(_classThis, "StorageService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StorageService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
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
    _classThis.USER_KEY_ITEM = "users";
    _classThis.USER_MEAL_KEY_ITEM = "userMeals_"; //Clave: userMeals_56 + el id del user
    _classThis.USER_MINI_MEAL_KEY_ITEM = "userMiniMeals_"; // tambien con el id del usuario
    _classThis.USER_WEEKLY_PLANS = "weeklyPlans_"; // tmabien con el id
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StorageService = _classThis;
})();
export { StorageService };
//# sourceMappingURL=storage-service.js.map