"use strict";
exports.__esModule = true;
exports.routes = void 0;
var layout_1 = require("./c_layout/layout/layout");
var home_1 = require("./c_pages/home/home");
var details_1 = require("./c_pages/details/details");
var plan_week_1 = require("./c_pages/plan-week/plan-week");
var login_1 = require("./c_pages/login/login");
var not_found_1 = require("./c_pages/not-found/not-found");
var auth_guard_1 = require("./guards/auth-guard");
var my_recipes_1 = require("./c_pages/my-recipes/my-recipes");
exports.routes = [
    {
        path: '',
        component: layout_1.Layout,
        children: [
            { path: '', component: home_1.Home },
            { path: 'details/:id', component: details_1.Details, canActivate: [auth_guard_1.authGuard] },
            { path: 'plan-week', component: plan_week_1.PlanWeek, canActivate: [auth_guard_1.authGuard] },
            { path: 'my-recipes', component: my_recipes_1.MyRecipes, canActivate: [auth_guard_1.authGuard] }
        ]
    },
    { path: 'login', component: login_1.Login },
    { path: '**', component: not_found_1.NotFound },
];
