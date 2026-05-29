"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Login = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var auth_service_1 = require("../../services/auth-service");
var router_1 = require("@angular/router");
var Login = /** @class */ (function () {
    function Login() {
        var _this = this;
        // Controladores para saber si el usuario ha dado clic en "Enviar"
        this.loginSubmitted = false;
        this.registerSubmitted = false;
        this.registroExitoso = false;
        this.errorCreacion = core_1.input();
        this.authService = core_1.inject(auth_service_1.AuthService);
        this.router = core_1.inject(router_1.Router);
        this.mostrarErrorGlobal = core_1.computed(function () { return _this.errorCreacion() === 'true'; });
        this.loginForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
        /*
        Angular es muy ordenado. Como un cajón individual (FormControl) y una cajonera entera (FormGroup) son cosas distintas,
        Angular inventó una palabra genérica para referirse a "cualquier cosa que sirva para controlar datos".
        Esa palabra es AbstractControl */
        this.registerForm = new forms_1.FormGroup({
            name: new forms_1.FormControl("", [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            passwordConfirm: new forms_1.FormControl('', [forms_1.Validators.required])
        }, {
            validators: this.passwordCoinciden.bind(this)
        });
    }
    Login.prototype.handleSubmitLogin = function () {
        var _a;
        this.loginSubmitted = true;
        if ((_a = this.loginForm.get("email")) === null || _a === void 0 ? void 0 : _a.valid) {
            console.log("email valido");
        }
        if (this.loginForm.valid) {
            console.log("Entra en valid del formulario...");
            this.authService.authLogin(this.loginForm.value.emailL);
        }
    };
    Object.defineProperty(Login.prototype, "password", {
        /* con estas 2 funciones devuelvo el input directamente asi puedo acceder a su valor */
        get: function () { return this.registerForm.get('password'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Login.prototype, "passwordConfirm", {
        get: function () { return this.registerForm.get('passwordConfirm'); },
        enumerable: false,
        configurable: true
    });
    Login.prototype.handleSubmitRegister = function () {
        var _a, _b, _c;
        this.registerSubmitted = true; // Marcamos que intentó enviar el registro
        if (this.registerForm.valid) {
            var new_user = {
                id: this.authService.getLastUser(),
                name: (_a = this.registerForm.get('name')) === null || _a === void 0 ? void 0 : _a.value,
                email: (_b = this.registerForm.get('email')) === null || _b === void 0 ? void 0 : _b.value,
                password: (_c = this.registerForm.get('password')) === null || _c === void 0 ? void 0 : _c.value
            };
            if (this.authService.authRegister(new_user)) {
                this.registroExitoso = true;
            }
            else {
                // aqui añadimos la query en el login
                this.router.navigate(['/login'], { queryParams: { errorCreacion: 'true' } });
            }
            console.log('Datos de registro válidos:', this.registerForm.value);
        }
    };
    // esto es el input que se le pase al llamar a la funcion control: AbstractControl
    Login.prototype.getValidationClass = function (control, isSubmitted) {
        if (!isSubmitted)
            return ''; // Si no ha dado a enviar, no pintes nada todavía
        if (!control)
            return '';
        return control.valid ? 'is-valid' : 'is-invalid'; // Devuelve la clase correspondiente
    };
    Login.prototype.getValidationClassConfirmPassword = function () {
        var _a, _b;
        if (!this.registerSubmitted) { // si no ha pulsado crear el formulario todavia
            return "";
        }
        if ((_a = this.passwordConfirm) === null || _a === void 0 ? void 0 : _a.errors) {
            return "is-invalid";
        }
        if ((_b = this.registerForm.errors) === null || _b === void 0 ? void 0 : _b['passwordNoCoinciden']) {
            return "is-invalid";
        }
        return 'is-valid';
    };
    Login.prototype.passwordCoinciden = function (group) {
        var _a, _b;
        var password = (_a = group.get('password')) === null || _a === void 0 ? void 0 : _a.value;
        var passwordConfirm = (_b = group.get('passwordConfirm')) === null || _b === void 0 ? void 0 : _b.value;
        // ¿Son idénticas?
        // Si sí, devolvemos null (que significa "sin errores") [cite: 175]
        // Si no, creamos el error global 'passwordsNoCoinciden'
        return password === passwordConfirm ? null : { passwordNoCoinciden: true };
    };
    Login = __decorate([
        core_1.Component({
            selector: 'app-login',
            imports: [forms_2.ReactiveFormsModule, common_1.CommonModule],
            templateUrl: './login.html',
            styleUrl: './login.css',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], Login);
    return Login;
}());
exports.Login = Login;
