"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlanWeekList = void 0;
var core_1 = require("@angular/core");
var storage_service_1 = require("../../services/storage-service");
var util_1 = require("../../model/util");
var PlanWeekList = /** @class */ (function () {
    function PlanWeekList() {
        this.local = core_1.inject(storage_service_1.StorageService);
        this.planes = core_1.signal([]);
        this.semanaActual = util_1.Util.getISOWeek(new Date());
        this.updateList = 0;
    }
    PlanWeekList.prototype.ngOnChanges = function () {
        var _a;
        // Se ejecuta cada vez que updateList cambia
        // Es decir, cada vez que el padre le pasa un valor nuevo
        var userId = (_a = this.local.getSession()) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            this.planes.set(this.local.getWeeklyPlans(userId));
        }
    };
    PlanWeekList.prototype.eliminarPlan = function (planId) {
        if (!confirm('¿Seguro que quieres eliminar este plan?'))
            return;
        var ok = this.local.deletePlan(planId);
        if (ok) {
            this.planes.update(function (planes) { return planes.filter(function (p) { return p.id !== planId; }); });
        }
    };
    __decorate([
        core_1.Input()
    ], PlanWeekList.prototype, "updateList");
    PlanWeekList = __decorate([
        core_1.Component({
            selector: 'app-plan-week-list',
            imports: [],
            templateUrl: './plan-week-list.html',
            styleUrl: './plan-week-list.css'
        })
    ], PlanWeekList);
    return PlanWeekList;
}());
exports.PlanWeekList = PlanWeekList;
