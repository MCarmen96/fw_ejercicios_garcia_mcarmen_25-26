"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var ApiService = /** @class */ (function () {
    // * Obtener recetas aleatorias (con o sin categoría)
    // Obtener recetas por ingrediente
    // Obtener detalles completos de una receta
    // * Obtener categorías disponibles
    function ApiService() {
        this.API_KEY = "1";
        this.API_URL = "https://www.themealdb.com/api/json/v1/" + this.API_KEY;
    }
    ApiService.prototype.getMeals = function () {
        return __awaiter(this, void 0, Promise, function () {
            var datos, respuesta, mealData, ingredientes, index, nombre, medida, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.API_URL + "/random.php")];
                    case 1:
                        respuesta = _a.sent();
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        mealData = datos.meals[0];
                        ingredientes = [];
                        //este bucle recojo los 20 ingredientes
                        for (index = 1; index < 20; index++) {
                            nombre = mealData["strIngredient" + index];
                            medida = mealData["strMeasure" + index];
                            // si el nombre existe y no esta vacio
                            if (nombre && nombre.trim() !== "") {
                                ingredientes.push({
                                    name: nombre,
                                    measure: medida
                                });
                            }
                            else {
                                break;
                            }
                        }
                        return [2 /*return*/, {
                                idMeal: datos.meals[0].idMeal,
                                strMeal: datos.meals[0].strMeal,
                                strCategory: datos.meals[0].strCategory,
                                strArea: datos.meals[0].strArea,
                                strMealThumb: datos.meals[0].strMealThumb,
                                ingredients: ingredientes
                            }];
                    case 3:
                        error_1 = _a.sent();
                        console.log("Error al obtener la receta aleatoria:", error_1);
                        console.log(error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.getCategorys = function () {
        return __awaiter(this, void 0, Promise, function () {
            var datos, categorias, respuesta, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categorias = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(this.API_URL + "/categories.php")];
                    case 2:
                        respuesta = _a.sent();
                        return [4 /*yield*/, respuesta.json()];
                    case 3:
                        datos = _a.sent();
                        //console.log("categorias: ", datos)
                        // si la clave categories existe y su array es mayor a 0 lo recorro
                        if (datos.categories && datos.categories.length > 0) {
                            datos.categories.sort(function (a, b) {
                                return a.strCategory.localeCompare(b.strCategory);
                            });
                            datos.categories.forEach(function (categoria) {
                                categorias.push({
                                    idCategory: categoria.idCategory,
                                    strCategory: categoria.strCategory
                                });
                            });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log("Error al obtener las catgorias:");
                        console.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, categorias];
                }
            });
        });
    };
    ApiService.prototype.getMealsForCategorys = function (categoria) {
        return __awaiter(this, void 0, Promise, function () {
            var respuesta, datos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.API_URL + "/filter.php?c=" + categoria)];
                    case 1:
                        respuesta = _a.sent();
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        return [2 /*return*/, datos.meals]; // Esto devuelve una lista de recetas (solo con nombre, ID y foto)
                }
            });
        });
    };
    ApiService.prototype.getMealForId = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var respuesta, datos, mealData, ingredientes, i, nombre, medida, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.API_URL + "/lookup.php?i=" + id)];
                    case 1:
                        respuesta = _a.sent();
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        mealData = datos.meals[0];
                        ingredientes = [];
                        for (i = 1; i <= 20; i++) {
                            nombre = mealData["strIngredient" + i];
                            medida = mealData["strMeasure" + i];
                            if (nombre && nombre.trim() !== "") {
                                ingredientes.push({ name: nombre, measure: medida });
                            }
                        }
                        return [2 /*return*/, {
                                idMeal: mealData.idMeal,
                                strMeal: mealData.strMeal,
                                strCategory: mealData.strCategory,
                                strArea: mealData.strArea,
                                strMealThumb: mealData.strMealThumb,
                                ingredients: ingredientes
                            }];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.getMealFilterIngredient = function (ingrediente) {
        return __awaiter(this, void 0, Promise, function () {
            var respuesta, datos, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.API_URL + "/filter.php?i=" + ingrediente)];
                    case 1:
                        respuesta = _a.sent();
                        console.log("Ruta=" + (this.API_URL + "filter.php?i=" + ingrediente));
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        datos = _a.sent();
                        console.log("Recetas filtradas=> " + datos.meals);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log("Error al cargar recetas por ingredientes...." + error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, datos.meals];
                }
            });
        });
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
        // * Obtener recetas aleatorias (con o sin categoría)
        // Obtener recetas por ingrediente
        // Obtener detalles completos de una receta
        // * Obtener categorías disponibles
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
