"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Details = void 0;
var details_save_1 = require("./../details-save/details-save");
var core_1 = require("@angular/core");
var details_meal_1 = require("../details-meal/details-meal");
var auth_service_1 = require("../../services/auth-service");
var router_1 = require("@angular/router");
var Details = /** @class */ (function () {
    function Details() {
        this.idReceta = core_1.signal('');
        //public login= signal<boolean>(false);
        this.idUser = -1;
        this.authService = core_1.inject(auth_service_1.AuthService);
        this.isAuthenticated = this.authService.isAuthenticated;
        this.exitoGuardado = core_1.signal(false);
        this.route = core_1.inject(router_1.ActivatedRoute);
        this.isSave = core_1.signal(false);
        var session = this.authService.isSession();
        if (session != null) {
            //this.login.set(true);
            this.idUser = session.userId;
        }
        var idUrl = this.route.snapshot.params['id'];
        this.idReceta.set(idUrl);
    }
    Details.prototype.mostrarExito = function (exito) {
        if (exito) {
            this.exitoGuardado.set(true);
        }
    };
    /* esta funcion recibe un emmiter del hijo y en funcion de eso cambio mi signal */
    Details.prototype.mostrarComentario = function (exito) {
        this.isSave.set(exito);
    };
    Details = __decorate([
        core_1.Component({
            selector: 'app-details',
            imports: [details_meal_1.DetailsMeal, details_save_1.DetailsSave],
            templateUrl: './details.html',
            styleUrl: './details.css'
        })
    ], Details);
    return Details;
}());
exports.Details = Details;
