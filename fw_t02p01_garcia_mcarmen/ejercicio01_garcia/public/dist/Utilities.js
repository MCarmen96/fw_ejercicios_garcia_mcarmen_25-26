export class Utilities {
    static validarRegistro(form, local) {
        // dividir en funciones mas pequeñas para comprobar el email y la contraseña por si se pueden reutilizar
        const password = form.querySelector("#password");
        const confirmPass = form.querySelector("#confirmPassword");
        const email = form.querySelector("#email");
        const name = form.querySelector("#nombre");
        if (name.value == "") {
            name.setCustomValidity('El nombre es obligatorio');
        }
        else {
            name.setCustomValidity('');
        }
        //validar si el email ya exite
        if (local.getEmailUser(email.value)) { //si existe 
            email.setCustomValidity('Este email ya esta registrado');
        }
        else {
            if (email.value == "") {
                email.setCustomValidity('Email vacio');
            }
            else {
                email.setCustomValidity("");
            }
        }
        //validar contraseña
        if (password.value != "" && confirmPass.value != "") {
            if (password.value.length < 4 && confirmPass.value.length < 4) {
                confirmPass.setCustomValidity('La contraseña debe tener al menos 4 caracteres.');
            }
            else {
                if (password.value !== confirmPass.value) {
                    confirmPass.setCustomValidity('Las contraseñas no coinciden');
                }
                else {
                    confirmPass.setCustomValidity('');
                }
            }
        }
        else {
            confirmPass.setCustomValidity("La contraseña es obligatoria");
            password.setCustomValidity("La contraseña es obligatoria");
        }
        //añado la clase de validacion de boostrap
        form.classList.add('was-validated');
        //Retornamos si el formulario completo cumple con los 'required', 'minlength', etc.
        return form.checkValidity(); // devuelve true o false
    }
    static validarLogin(form, local) {
        const emailInput = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");
        // verificamos que estan los inputs
        if (emailInput.value != "" && password.value != "") {
            if (local.getPasswordUser(password.value) && local.getEmailUser(emailInput.value)) {
                local.activeLogin(emailInput.value);
                emailInput.setCustomValidity("");
                password.setCustomValidity("");
            }
        }
        else {
            emailInput.setCustomValidity("El email es obligatorio");
            password.setCustomValidity("La password es obligatoria");
        }
        //añado la clase de validacion de boostrap
        form.classList.add('was-validated');
        //Retornamos si el formulario completo cumple con los 'required', 'minlength', etc.
        return form.checkValidity(); // devuelve true o false
    }
}
//# sourceMappingURL=Utilities.js.map