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
var Home = /** @class */ (function () {
    function Home() {
        this.isServerRunning = false;
        this.characters = [
            { id: 0, name: 'Megumi' },
            { id: 1, name: 'Choso' },
            { id: 2, name: 'Itadori' },
            { id: 3, name: 'Sukuna' },
            { id: 4, name: 'Goyo' },
            { id: 5, name: 'Geto' },
        ];
        this.isEditable = true;
        this.message = '';
        this.boxClass = 'box-class';
        this.itemsParent = [];
        this.titleComp = 'HOME CARMEN 🦁🦁';
    }
    Home.prototype.onMouseOverAction = function () {
        this.message = "Let's go!";
    };
    Home.prototype.onMouseOutAction = function () {
        this.message = "";
    };
    Home.prototype.addItemParent = function (newItem) {
        this.itemsParent.push(newItem);
    };
    Home = __decorate([
        core_1.Component({
            selector: 'app-home',
            standalone: false,
            templateUrl: './home.html',
            styleUrl: './home.css'
        })
    ], Home);
    return Home;
}());
exports.Home = Home;
