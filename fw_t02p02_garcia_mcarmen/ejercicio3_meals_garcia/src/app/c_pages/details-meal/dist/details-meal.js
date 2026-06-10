"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetailsMeal = void 0;
var core_1 = require("@angular/core");
var api_service_1 = require("../../services/api-service");
var auth_service_1 = require("../../services/auth-service");
var storage_service_1 = require("../../services/storage-service");
var DetailsMeal = /** @class */ (function () {
    function DetailsMeal() {
        this.apiService = core_1.inject(api_service_1.ApiService);
        this.authService = core_1.inject(auth_service_1.AuthService);
        this.meal = core_1.signal(null);
        this.mealSave = core_1.signal(false);
        this.isAuthenticated = this.authService.isAuthenticated;
        this.local = core_1.inject(storage_service_1.StorageService);
        this.isSave = new core_1.EventEmitter;
    }
    /* Esta funcion es la que recoje el id que le pasa el padre esta escuchando en todo momento cuando cambia el id */
    DetailsMeal.prototype.ngOnChanges = function (changes) {
        if (changes['idReceta'] && this.idReceta) {
            this.cargarReceta(this.idReceta);
        }
    };
    DetailsMeal.prototype.cargarReceta = function (idReceta) {
        var _this = this;
        this.apiService.getMealForId(idReceta)
            .then(function (resultado) {
            /* AQUI HAGO LA PETICION AL LOCAL Y PASANDOLE EL ID DE LA RECETA Y ME BUSCA SI ESTA GUARDADA O NO */
            _this.meal.set(resultado);
            var id = Number(idReceta);
            if (_this.local.searchMiniMeal(id)) {
                _this.mealSave.set(true);
                _this.isSave.emit(true);
            }
        })["catch"](function (err) {
            console.log(err);
        });
    };
    DetailsMeal.prototype.guardarReceta = function () {
        var recetaActual = this.meal();
        if (!recetaActual)
            return;
        // si no esta guardada
        if (!this.mealSave()) {
            var miniMeal = {
                id: recetaActual.idMeal,
                name: recetaActual.strMeal,
                image_small: recetaActual.strMealThumb
            };
            if (this.local.guardarReceta(miniMeal)) {
                this.mealSave.set(true);
                this.isSave.emit(true);
            }
        }
        else {
            var id = Number(recetaActual.idMeal);
            this.local.quitarRecetaGuardada(id);
            this.mealSave.set(false);
            this.isSave.emit(false);
        }
    };
    __decorate([
        core_1.Input()
    ], DetailsMeal.prototype, "idReceta");
    __decorate([
        core_1.Output()
    ], DetailsMeal.prototype, "isSave");
    DetailsMeal = __decorate([
        core_1.Component({
            selector: 'app-details-meal',
            imports: [],
            templateUrl: './details-meal.html',
            styleUrl: './details-meal.css'
        })
    ], DetailsMeal);
    return DetailsMeal;
}());
exports.DetailsMeal = DetailsMeal;
