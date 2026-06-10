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
exports.PlanWeekCreate = void 0;
var core_1 = require("@angular/core");
var api_service_1 = require("../../services/api-service");
var storage_service_1 = require("../../services/storage-service");
var util_1 = require("../../model/util");
var PlanWeekCreate = /** @class */ (function () {
    function PlanWeekCreate() {
        this.api = core_1.inject(api_service_1.ApiService);
        this.local = core_1.inject(storage_service_1.StorageService);
        this.planId = core_1.signal('');
        this.planIdError = core_1.signal('');
        this.resultadosBusqueda = core_1.signal([]);
        this.diaSeleccionado = core_1.signal('');
        this.tipoSeleccionado = core_1.signal('');
        this.planTemporal = core_1.signal([]);
        this.planSave = new core_1.EventEmitter(false);
    }
    PlanWeekCreate.prototype.buscarReceta = function (ingrediente) {
        return __awaiter(this, void 0, void 0, function () {
            var datos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // si no hay dia seleciona y tipo selecionado no busco
                        if (!this.diaSeleccionado() || !this.tipoSeleccionado())
                            return [2 /*return*/];
                        return [4 /*yield*/, this.api.getMealFilterIngredient(ingrediente.trim())];
                    case 1:
                        datos = _a.sent();
                        this.resultadosBusqueda.set(datos);
                        return [2 /*return*/];
                }
            });
        });
    };
    PlanWeekCreate.prototype.onFechaChange = function (event) {
        var _a;
        var input = event.target;
        if (!input.value) {
            this.planId.set('');
            this.planIdError.set('');
            return;
        }
        // Añadimos T12:00:00 para evitar problemas de zona horaria
        // Sin esto, new Date('2026-06-10') puede crear el día anterior en UTC-X
        var fecha = new Date(input.value + 'T12:00:00');
        var id = util_1.Util.getISOWeek(fecha);
        this.planId.set(id);
        // Validar que no exista ya un plan con ese ID
        var userId = (_a = this.local.getSession()) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            //aplicamos a la lista de los planes semanales de ese usaurio el some
            var planExistente = this.local.getWeeklyPlans(userId).some(function (p) { return p.id === id; });
            this.planIdError.set(planExistente ? "Ya tienes un plan para " + id + ". Elige otra fecha." : '');
        }
    };
    PlanWeekCreate.prototype.addAlPlan = function (meal) {
        var dia = this.diaSeleccionado();
        var tipo = this.tipoSeleccionado();
        if (!dia || !tipo)
            return;
        var id = Number(meal.idMeal);
        // Sacas el array actual del signal, trabajas con él normal
        var arrayAuxiliar = this.planTemporal();
        var diaExistente = arrayAuxiliar.find(function (d) { return d.day === dia; });
        if (diaExistente) {
            if (tipo === 'lunch') {
                diaExistente.lunchMealId = id;
                diaExistente.lunchMealName = meal.strMeal;
            }
            else {
                diaExistente.dinnerMealId = id;
                diaExistente.dinnerMealName = meal.strMeal;
            }
        }
        else {
            var nuevo = { day: dia };
            if (tipo === 'lunch') {
                nuevo.lunchMealId = id;
                nuevo.lunchMealName = meal.strMeal;
            }
            else {
                nuevo.dinnerMealId = id;
                nuevo.dinnerMealName = meal.strMeal;
            }
            arrayAuxiliar.push(nuevo); // push normal, sin magia
        }
        // Al final, metes el array entero de golpe en el signal
        this.planTemporal.set(__spreadArrays(arrayAuxiliar));
        /*
        Creas un array nuevo en otra dirección de memoria con los mismos elementos.
        El signal compara → objeto distinto → hay cambio, re-renderiza.
       */
        //se limpian los resultado de busqueda y el tipo de cena|comida selecionado
        this.tipoSeleccionado.set('');
        this.resultadosBusqueda.set([]); //
    };
    PlanWeekCreate.prototype.quitarDia = function (dia) {
        this.planTemporal.update(function (plan) { return plan.filter(function (d) { return d.day !== dia; }); });
    };
    PlanWeekCreate.prototype.guardarPlan = function () {
        var plan = {
            id: this.planId(),
            userId: this.local.getSession().userId,
            days: this.planTemporal()
        };
        var ok = this.local.saveWeeklyPlan(plan);
        if (ok) {
            this.resetFormulario();
            this.planSave.emit(true);
        }
        else {
            console.error('Error al guardar el plan');
        }
    };
    PlanWeekCreate.prototype.resetFormulario = function () {
        this.planId.set('');
        this.planIdError.set('');
        this.diaSeleccionado.set('');
        this.tipoSeleccionado.set('');
        this.resultadosBusqueda.set([]);
        this.planTemporal.set([]);
    };
    __decorate([
        core_1.Output()
    ], PlanWeekCreate.prototype, "planSave");
    PlanWeekCreate = __decorate([
        core_1.Component({
            selector: 'app-plan-week-create',
            imports: [],
            templateUrl: './plan-week-create.html',
            styleUrl: './plan-week-create.css'
        })
    ], PlanWeekCreate);
    return PlanWeekCreate;
}());
exports.PlanWeekCreate = PlanWeekCreate;
