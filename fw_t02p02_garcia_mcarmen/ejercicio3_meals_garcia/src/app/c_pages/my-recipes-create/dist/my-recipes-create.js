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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MyRecipesCreate = void 0;
var core_1 = require("@angular/core");
var api_service_1 = require("../../services/api-service");
var storage_service_1 = require("../../services/storage-service");
var util_1 = require("../../model/util");
var forms_1 = require("@angular/forms");
var MyRecipesCreate = /** @class */ (function () {
    function MyRecipesCreate() {
        this.api = core_1.inject(api_service_1.ApiService);
        this.local = core_1.inject(storage_service_1.StorageService);
        this.fb = core_1.inject(forms_1.FormBuilder);
        this.recipeSaved = new core_1.EventEmitter();
        // Datos para los selects
        this.categorias = core_1.signal([]);
        this.areas = core_1.signal([]);
        // Arrays dinámicos para ingredientes e imágenes
        this.ingredientes = core_1.signal([]);
        this.imagenes = core_1.signal([]);
        // Formulario reactivo solo para los campos de texto
        this.recipeForm = this.fb.group({
            nombre: ['', forms_1.Validators.required],
            categoria: ['', forms_1.Validators.required],
            area: ['', forms_1.Validators.required],
            instrucciones: ['', forms_1.Validators.required]
        });
    }
    Object.defineProperty(MyRecipesCreate.prototype, "nombre", {
        get: function () { return this.recipeForm.get('nombre'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyRecipesCreate.prototype, "categoria", {
        get: function () { return this.recipeForm.get('categoria'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyRecipesCreate.prototype, "area", {
        get: function () { return this.recipeForm.get('area'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyRecipesCreate.prototype, "instrucciones", {
        get: function () { return this.recipeForm.get('instrucciones'); },
        enumerable: false,
        configurable: true
    });
    MyRecipesCreate.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            var cats, areas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.getCategorys()];
                    case 1:
                        cats = _a.sent();
                        this.categorias.set(cats.map(function (c) { return c.strCategory; }));
                        return [4 /*yield*/, this.api.getAreas()];
                    case 2:
                        areas = _a.sent();
                        this.areas.set(areas);
                        return [2 /*return*/];
                }
            });
        });
    };
    MyRecipesCreate.prototype.addIngrediente = function (name, measure) {
        if (!name.trim() || !measure.trim())
            return;
        var aux = this.ingredientes();
        aux.push({ name: name.trim(), measure: measure.trim() });
        this.ingredientes.set(__spreadArrays(aux));
    };
    MyRecipesCreate.prototype.removeIngrediente = function (index) {
        this.ingredientes.update(function (arr) { return arr.filter(function (_, i) { return i !== index; }); });
    };
    MyRecipesCreate.prototype.addImagen = function (url) {
        if (!url.trim())
            return;
        var aux = this.imagenes();
        aux.push(url.trim());
        this.imagenes.set(__spreadArrays(aux));
    };
    MyRecipesCreate.prototype.removeImagen = function (index) {
        this.imagenes.update(function (arr) { return arr.filter(function (_, i) { return i !== index; }); });
    };
    MyRecipesCreate.prototype.guardarReceta = function () {
        if (this.recipeForm.invalid) {
            this.recipeForm.markAllAsTouched();
            return;
        }
        if (this.ingredientes().length === 0)
            return;
        if (this.imagenes().length === 0)
            return;
        var userId = this.local.getSession().userId;
        var recetasExistentes = this.local.getOwnRecipes(userId);
        var nueva = {
            id: util_1.Util.generateId(recetasExistentes),
            userId: userId,
            name: this.recipeForm.value.nombre,
            category: this.recipeForm.value.categoria,
            area: this.recipeForm.value.area,
            instructions: this.recipeForm.value.instrucciones,
            ingredients: this.ingredientes(),
            images: this.imagenes()
        };
        var ok = this.local.saveOwnRecipe(nueva);
        if (ok) {
            this.recipeForm.reset();
            this.ingredientes.set([]);
            this.imagenes.set([]);
            this.recipeSaved.emit(true);
        }
    };
    __decorate([
        core_1.Output()
    ], MyRecipesCreate.prototype, "recipeSaved");
    MyRecipesCreate = __decorate([
        core_1.Component({
            selector: 'app-my-recipes-create',
            imports: [forms_1.ReactiveFormsModule],
            templateUrl: './my-recipes-create.html',
            styleUrl: './my-recipes-create.css'
        })
    ], MyRecipesCreate);
    return MyRecipesCreate;
}());
exports.MyRecipesCreate = MyRecipesCreate;
