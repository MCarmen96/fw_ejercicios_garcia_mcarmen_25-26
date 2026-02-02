import { StorageService } from "./StorageService.js";
export class Utilities {
    static validarRegistro(form) {
        // dividir en funciones mas pequeñas para comprobar el email y la contraseña por si se pueden reutilizar
        const local = new StorageService();
        const password = form.querySelector("#password");
        const confirmPass = form.querySelector("#confirmPassword");
        const email = form.querySelector("#email");
        //validar si el email ya exite
        if (local.getEmailUser(email.value)) { //si existe 
            email.setCustomValidity('este email ya esta registrado');
        }
        else {
            email.setCustomValidity('');
        }
        //validar si coninciden las contraseñas
        if (password && confirmPass) {
            if (password.value !== confirmPass.value) {
                confirmPass.setCustomValidity('Las contraseñas no coinciden');
            }
            else {
                confirmPass.setCustomValidity('');
            }
            //añado la clase de validacion de boostrap
            form.classList.add('was-validated');
            // 4. Retornamos si el formulario completo cumple con los 'required', 'minlength', etc.
            return form.checkValidity();
        }
    }
    static validarLogin() {
    }
}
//# sourceMappingURL=Utilities.js.map