"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyRecipesList = void 0;
var core_1 = require("@angular/core");
var storage_service_1 = require("../../services/storage-service");
var MyRecipesList = /** @class */ (function () {
    function MyRecipesList() {
        this.local = core_1.inject(storage_service_1.StorageService);
        this.updateList = 0;
        this.recipes = core_1.signal([]);
        this.selectedRecipe = core_1.signal(null);
    }
    MyRecipesList.prototype.ngOnChanges = function () {
        var _a;
        var userId = (_a = this.local.getSession()) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            this.recipes.set(this.local.getOwnRecipes(userId));
        }
    };
    MyRecipesList.prototype.verDetalle = function (recipe) {
        this.selectedRecipe.set(recipe);
    };
    MyRecipesList.prototype.cerrarDetalle = function () {
        this.selectedRecipe.set(null);
    };
    MyRecipesList.prototype.eliminarReceta = function (id) {
        var _a;
        if (!confirm('¿Seguro que quieres eliminar esta receta?'))
            return;
        var ok = this.local.deleteOwnRecipe(id);
        if (ok) {
            this.recipes.update(function (arr) { return arr.filter(function (r) { return r.id !== id; }); });
            if (((_a = this.selectedRecipe()) === null || _a === void 0 ? void 0 : _a.id) === id) {
                this.selectedRecipe.set(null);
            }
        }
    };
    __decorate([
        core_1.Input()
    ], MyRecipesList.prototype, "updateList");
    MyRecipesList = __decorate([
        core_1.Component({
            selector: 'app-my-recipes-list',
            imports: [],
            templateUrl: './my-recipes-list.html',
            styleUrl: './my-recipes-list.css'
        })
    ], MyRecipesList);
    return MyRecipesList;
}());
exports.MyRecipesList = MyRecipesList;
