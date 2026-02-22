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
exports.MealsCategory = void 0;
var core_1 = require("@angular/core");
var api_service_1 = require("../../services/api-service");
var MealsCategory = /** @class */ (function () {
    function MealsCategory() {
        this.titleComp = "MEALS";
        this.apiService = core_1.inject(api_service_1.ApiService);
        //private changesDetector=inject(ChangeDetectorRef);
        this._meals = core_1.signal([]);
        this._categorys = core_1.signal([]);
        this.loading = true;
        this.error = '';
    }
    Object.defineProperty(MealsCategory.prototype, "categorys", {
        get: function () {
            return this._categorys();
        },
        set: function (category) {
            this._categorys.set(category);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MealsCategory.prototype, "meals", {
        get: function () {
            return this._meals();
        },
        set: function (meal) {
            this._meals.set(meal);
        },
        enumerable: false,
        configurable: true
    });
    MealsCategory.prototype.loadMeals = function () {
        return __awaiter(this, void 0, Promise, function () {
            var arrayAux, index, receta, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        arrayAux = [];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < 8)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.apiService.getMeals()];
                    case 2:
                        receta = _a.sent();
                        if (receta) {
                            arrayAux.push(receta);
                        }
                        //this.changesDetector.markForCheck();
                        console.log(arrayAux);
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4:
                        this._meals.set(arrayAux);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.error = 'Error loading meals';
                        this.loading = false;
                        console.error(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MealsCategory.prototype.loadCategorys = function () {
        return __awaiter(this, void 0, Promise, function () {
            var arrayAux, categorys, index, category, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        arrayAux = [];
                        return [4 /*yield*/, this.apiService.getCategorys()];
                    case 1:
                        categorys = _a.sent();
                        //console.log(categorys);
                        for (index = 0; index < categorys.length; index++) {
                            category = categorys[index];
                            if (category) {
                                arrayAux.push(category);
                            }
                            this._categorys.set(arrayAux);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        this.error = 'Error';
                        this.loading = false;
                        console.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MealsCategory.prototype.onCategoryChange = function (event) {
        return __awaiter(this, void 0, Promise, function () {
            var selectElement, selectedCategory;
            return __generator(this, function (_a) {
                selectElement = event.target;
                selectedCategory = selectElement.value;
                if (selectedCategory === "") {
                    this.loadMeals();
                }
                else {
                    this.searchByCategory(selectedCategory);
                }
                return [2 /*return*/];
            });
        });
    };
    MealsCategory.prototype.searchByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var mealsSelected, arrayAux, index, meal, mealDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiService.getMealsForCategorys(category)];
                    case 1:
                        mealsSelected = _a.sent();
                        arrayAux = [];
                        console.log(mealsSelected);
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < 8)) return [3 /*break*/, 5];
                        meal = mealsSelected[index];
                        return [4 /*yield*/, this.apiService.getMealForId(meal.idMeal.toString())];
                    case 3:
                        mealDetails = _a.sent();
                        //console.log("receta categoria selecionada:", mealDetails);
                        if (mealDetails) {
                            arrayAux.push(mealDetails);
                        }
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5:
                        this._meals.set(arrayAux);
                        return [2 /*return*/];
                }
            });
        });
    };
    //Angular lo ejecuta automáticamente una vez, justo después de crear el componente.
    MealsCategory.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadMeals()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadCategorys()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MealsCategory = __decorate([
        core_1.Component({
            selector: 'app-meals-category',
            imports: [],
            templateUrl: './meals-category.html',
            styleUrl: './meals-category.css'
        })
    ], MealsCategory);
    return MealsCategory;
}());
exports.MealsCategory = MealsCategory;
