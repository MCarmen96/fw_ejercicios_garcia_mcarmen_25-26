"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlanWeek = void 0;
var core_1 = require("@angular/core");
var plan_week_create_1 = require("../plan-week-create/plan-week-create");
var plan_week_list_1 = require("../plan-week-list/plan-week-list");
var PlanWeek = /** @class */ (function () {
    function PlanWeek() {
    }
    PlanWeek = __decorate([
        core_1.Component({
            selector: 'app-plan-week',
            imports: [plan_week_create_1.PlanWeekCreate, plan_week_list_1.PlanWeekList],
            templateUrl: './plan-week.html',
            styleUrl: './plan-week.css'
        })
    ], PlanWeek);
    return PlanWeek;
}());
exports.PlanWeek = PlanWeek;
