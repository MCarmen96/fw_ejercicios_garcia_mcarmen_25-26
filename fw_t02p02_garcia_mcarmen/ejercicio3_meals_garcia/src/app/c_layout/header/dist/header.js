"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Header = void 0;
var core_1 = require("@angular/core");
var login_widget_1 = require("../login-widget/login-widget");
var auth_service_1 = require("../../services/auth-service");
var logout_widget_1 = require("../logout-widget/logout-widget");
var router_1 = require("@angular/router");
var Header = /** @class */ (function () {
    function Header() {
        var _this = this;
        this.authService = core_1.inject(auth_service_1.AuthService);
        this.isAuthenticated = this.authService.isAuthenticated;
        this.user = core_1.computed(function () {
            var _a, _b;
            if (_this.isAuthenticated()) {
                return (_b = (_a = _this.authService.isSession()) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
            }
            return '';
        });
        /* ngOnInit():void{
          if (this.authService.isSession() !== null) {
            this.user=this.authService.isSession()?.name;
            //this.isAuthenticated=true;
            //console.log('¡Hay una sesión activa!');
          }
        }
      
        public cambiarEstadoLogin(estado:boolean):void{
          //this.isAuthenticated=false;
          this.user="";
      
        } */
    }
    Header = __decorate([
        core_1.Component({
            selector: 'app-header',
            imports: [login_widget_1.LoginWidget, logout_widget_1.LogoutWidget, router_1.RouterLink],
            templateUrl: './header.html',
            styleUrl: './header.css'
        })
    ], Header);
    return Header;
}());
exports.Header = Header;
