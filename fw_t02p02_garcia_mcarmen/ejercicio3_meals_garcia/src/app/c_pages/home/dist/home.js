"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Home = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var meals_category_1 = require("../meals-category/meals-category");
var meals_save_1 = require("../meals-save/meals-save");
var auth_service_1 = require("../../services/auth-service");
var Home = /** @class */ (function () {
    function Home() {
        this.isAuthenticated = false; // más adelante vendrá de un AuthService
        this.auth = core_2.inject(auth_service_1.AuthService);
    }
    Home = __decorate([
        core_1.Component({
            selector: 'app-home',
            imports: [meals_category_1.MealsCategory, meals_save_1.MealsSave],
            templateUrl: './home.html',
            styleUrl: './home.css'
        })
    ], Home);
    return Home;
}());
exports.Home = Home;
