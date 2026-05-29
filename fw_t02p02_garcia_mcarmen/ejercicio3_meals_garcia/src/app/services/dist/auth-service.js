"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var storage_service_1 = require("../services/storage-service");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.local = core_1.inject(storage_service_1.StorageService);
    }
    AuthService.prototype.authLogin = function (email) {
        var user = this.local.getOneUser(email);
        if (user != null) {
            this.local.saveSession(user);
        }
    };
    AuthService.prototype.authRegister = function (user) {
        if (user != null) {
            return this.local.saveUser(user);
        }
        return false;
    };
    AuthService.prototype.getLastUser = function () {
        var id = this.local.getLastUser();
        return id;
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
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
