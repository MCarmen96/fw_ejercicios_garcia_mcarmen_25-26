"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyRecipes = void 0;
var core_1 = require("@angular/core");
var my_recipes_create_1 = require("../my-recipes-create/my-recipes-create");
var my_recipes_list_1 = require("../my-recipes-list/my-recipes-list");
var MyRecipes = /** @class */ (function () {
    function MyRecipes() {
        this.updateList = core_1.signal(0);
    }
    MyRecipes.prototype.onRecipeSaved = function (event) {
        if (event) {
            this.updateList.update(function (n) { return n + 1; });
        }
    };
    MyRecipes = __decorate([
        core_1.Component({
            selector: 'app-my-recipes',
            imports: [my_recipes_create_1.MyRecipesCreate, my_recipes_list_1.MyRecipesList],
            templateUrl: './my-recipes.html',
            styleUrl: './my-recipes.css'
        })
    ], MyRecipes);
    return MyRecipes;
}());
exports.MyRecipes = MyRecipes;
