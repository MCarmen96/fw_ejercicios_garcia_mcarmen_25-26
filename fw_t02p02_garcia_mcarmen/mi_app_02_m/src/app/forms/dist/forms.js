"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Forms = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Forms = /** @class */ (function () {
    function Forms() {
        this.titleComp = 'FORMS';
        this.favoriteFramework = '';
        this.module = {
            name: '',
            mark: ''
        };
        this.profileForm1 = new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            email: new forms_1.FormControl('')
        });
        this.profileForm = new forms_1.FormGroup({
            name: new forms_1.FormControl('', [forms_1.Validators.required,
                forms_1.Validators.minLength(3)]),
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.email, this.emailEduValidator])
        });
    }
    Forms.prototype.handleSubmit = function () {
        if (this.profileForm.valid) {
            alert("Nombre: " + this.profileForm.value.name + " (Email: \n             " + this.profileForm.value.email + ")");
        }
        else {
            alert('El formulario tiene errores.');
        }
    };
    // form
    Forms.prototype.emailEduValidator = function (control) {
        var email = control.value;
        return email && email.endsWith('@educastillalamancha.es')
            ? null : { emailEdu: true };
    };
    Forms = __decorate([
        core_1.Component({
            selector: 'app-forms',
            standalone: false,
            templateUrl: './forms.html',
            styleUrl: './forms.css'
        })
    ], Forms);
    return Forms;
}());
exports.Forms = Forms;
