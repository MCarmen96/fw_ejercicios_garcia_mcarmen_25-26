export class Utilities {
    static validarRegistro(form) {
        const password = form.querySelector("#password");
        const confirmPass = form.querySelector("#confirmPassword");
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
}
//# sourceMappingURL=Utilities.js.map