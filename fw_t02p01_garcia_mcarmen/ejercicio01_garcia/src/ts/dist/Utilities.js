"use strict";
exports.__esModule = true;
exports.Utilities = void 0;
var Utilities = /** @class */ (function () {
    function Utilities() {
    }
    Utilities.validarRegistro = function (form) {
        var password = form.querySelector("#password");
        var confirmPass = form.querySelector("#confirmPassword");
        if (password && confirmPass) {
            if (password.value !== confirmPass.value) {
            }
        }
    };
    return Utilities;
}());
exports.Utilities = Utilities;
