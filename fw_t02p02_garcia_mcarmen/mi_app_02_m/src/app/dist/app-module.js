"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing-module");
var app_1 = require("./app");
var user_1 = require("./user/user");
var child_1 = require("./child/child");
var comments_1 = require("./comments/comments");
var common_1 = require("@angular/common");
var home_1 = require("./home/home");
var forms_1 = require("./forms/forms");
var forms_2 = require("@angular/forms");
var forms_3 = require("@angular/forms");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_1.App,
                user_1.User,
                child_1.Child,
                comments_1.Comments,
                home_1.Home,
                forms_1.Forms
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                common_1.NgOptimizedImage,
                forms_2.FormsModule,
                forms_3.ReactiveFormsModule
            ],
            providers: [
                core_1.provideBrowserGlobalErrorListeners(),
            ],
            bootstrap: [app_1.App]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
