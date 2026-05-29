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
var storage_service_1 = require("../../services/storage-service");
var Login = /** @class */ (function () {
    function Login() {
        this.fb = core_1.inject(forms_1.FormBuilder);
        this.localStorageService = core_1.inject(storage_service_1.StorageService);
        this.registroExitoso = false;
        this.submitted = false;
        //controla cuándo empezar a mostrar la validación visual
        this.errorRegistro = '';
        this.registerForm = this.fb.group({
            nombreCompleto: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            email: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.email,
                    this.emailDominioEduValidator,
                    this.emailUnicoValidator.bind(this),
                ],
            ],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            confirmPassword: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]]
        }, { validators: this.passwordsCoinciden.bind(this) });
    }
    //Usa this internamente y para que no pierda el contexto usamos bind
    //Otra solución es usar una función flecha
    Login.prototype.emailUnicoValidator = function (control) {
        if (!control.value)
            return null;
        var emailExiste = this.localStorageService.userExists(control.value);
        return emailExiste ? { emailDuplicado: true } : null;
    };
    //No usa this internamente, no necesitamos bind.
    //Se recomienda usar bind por si hubiera cambios: this.emailDominioEduValidator.bind(this)
    Login.prototype.emailDominioEduValidator = function (control) {
        var email = control.value;
        if (!email)
            return null;
        var dominioValido = email.endsWith('@educastillalamancha.es');
        return dominioValido ? null : { dominioInvalido: true };
    };
    Login.prototype.passwordsCoinciden = function (group) {
        var _a, _b;
        var password = (_a = group.get('password')) === null || _a === void 0 ? void 0 : _a.value;
        var confirmPassword = (_b = group.get('confirmPassword')) === null || _b === void 0 ? void 0 : _b.value;
        return password === confirmPassword ? null : { passwordsNoCoinciden: true };
    };
    Object.defineProperty(Login.prototype, "nombreCompleto", {
        get: function () {
            return this.registerForm.get('nombreCompleto');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Login.prototype, "email", {
        get: function () {
            return this.registerForm.get('email');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Login.prototype, "password", {
        get: function () {
            return this.registerForm.get('password');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Login.prototype, "confirmPassword", {
        get: function () {
            return this.registerForm.get('confirmPassword');
        },
        enumerable: false,
        configurable: true
    });
    Login.prototype.onRegister = function () {
        this.submitted = true;
        this.errorRegistro = '';
        if (this.registerForm.valid) {
            var nuevoUsuario = {
                nombreCompleto: this.registerForm.value.nombreCompleto,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password
            };
            var success = this.localStorageService.addUser(nuevoUsuario);
            if (success) {
                this.registroExitoso = true;
                this.registerForm.reset();
                this.submitted = false;
            }
            else {
                //alert('Error al registrar el usuario');
                this.errorRegistro = 'Error al registrar el usuario. Por favor, inténtalo de nuevo.';
            }
        }
    };
    Login.prototype.irALogin = function () {
        this.registroExitoso = false;
        this.errorRegistro = '';
        var loginTab = document.getElementById('login-tab');
        loginTab === null || loginTab === void 0 ? void 0 : loginTab.click();
        //Si quieres ir al index (/) o a cualquier ruta, hazlo con Router.
    };
    Login.prototype.getValidationClass = function (control) {
        //NO mostrar validación hasta que el usuario envíe
        if (!this.submitted) {
            return '';
        }
        //Mi los controles de forma individual.
        if (!control) {
            return '';
        }
        if (control.valid) {
            return 'is-valid';
        }
        return 'is-invalid';
    };
    Login.prototype.getValidationClassConfirmPassword = function () {
        var _a;
        if (!this.submitted) {
            return '';
        }
        if (!this.confirmPassword) {
            return '';
        }
        // Primero verifico si el control tiene errores propios
        if (this.confirmPassword.errors) {
            return 'is-invalid';
        }
        // Luego verifico si el formulario tiene errores propios
        if ((_a = this.registerForm.errors) === null || _a === void 0 ? void 0 : _a['passwordsNoCoinciden']) {
            return 'is-invalid';
        }
        return 'is-valid';
    };
    Login = __decorate([
        core_1.Component({
            selector: 'app-login',
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            templateUrl: './login.html',
            styleUrl: './login.css'
        })
    ], Login);
    return Login;
}());
exports.Login = Login;
