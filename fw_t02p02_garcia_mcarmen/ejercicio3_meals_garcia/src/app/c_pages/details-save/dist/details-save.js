"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetailsSave = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var storage_service_1 = require("../../services/storage-service");
var DetailsSave = /** @class */ (function () {
    function DetailsSave() {
        // se declaran asi por que vienen del padre Details
        this.idReceta = "";
        this.idUser = -1;
        this.exitoGuardado = new core_1.EventEmitter(false); // parametro que va a recibir el padre
        this.local = core_1.inject(storage_service_1.StorageService);
        this.valoracionForm = new forms_1.FormGroup({
            textoComentario: new forms_1.FormControl("", [forms_1.Validators.required, forms_1.Validators.minLength(5)]),
            yaCocinada: new forms_1.FormControl("1", [forms_1.Validators.required]),
            puntuacion: new forms_1.FormControl(0, [forms_1.Validators.required])
        });
    }
    DetailsSave.prototype.guardarValoracion = function () {
        var _a, _b, _c, _d;
        if (this.valoracionForm.invalid) {
            // o la clase que tiene puesta alberto devolviendo la clase si el input no es valido
            this.valoracionForm.markAllAsTouched();
            return;
        }
        else {
            var valueCocinada = (_a = this.valoracionForm.get('yaCocinada')) === null || _a === void 0 ? void 0 : _a.value;
            var cocinada = valueCocinada === "2" ? "LA_HE_HECHO" : "QUIERO_HACERLA";
            var puntosReceta = Number((_b = this.valoracionForm.get('puntuacion')) === null || _b === void 0 ? void 0 : _b.value);
            var texto = (_d = (_c = this.valoracionForm.get('textoComentario')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
            var comentario = {
                userId: this.idUser,
                mealId: Number(this.idReceta),
                saveDate: new Date(),
                status: cocinada,
                notes: texto,
                rating: puntosReceta
            };
            if (this.local.saveCommentMeal(this.idUser, comentario)) {
                // emitimos la respuesta al padre
                this.exitoGuardado.emit(true);
            }
        }
    };
    __decorate([
        core_1.Input()
    ], DetailsSave.prototype, "idReceta");
    __decorate([
        core_1.Input()
    ], DetailsSave.prototype, "idUser");
    __decorate([
        core_1.Output()
    ], DetailsSave.prototype, "exitoGuardado");
    DetailsSave = __decorate([
        core_1.Component({
            selector: 'app-details-save',
            imports: [forms_1.ReactiveFormsModule],
            templateUrl: './details-save.html',
            styleUrl: './details-save.css'
        })
    ], DetailsSave);
    return DetailsSave;
}());
exports.DetailsSave = DetailsSave;
