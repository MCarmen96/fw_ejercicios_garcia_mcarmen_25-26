import { StorageService } from "./StorageService.js";

export class Utilities {



    public static validarRegistro(form: HTMLFormElement,local:StorageService) {
        // dividir en funciones mas pequeñas para comprobar el email y la contraseña por si se pueden reutilizar
        

        const password = form.querySelector("#password") as HTMLInputElement;
        const confirmPass = form.querySelector("#confirmPassword") as HTMLInputElement;
        const email = form.querySelector("#email") as HTMLInputElement;
        const name=form.querySelector("#nombre") as HTMLInputElement;

        if(name.value==""){
            name.setCustomValidity('El nombre es obligatorio');
        }else{
            name.setCustomValidity('');
        }

        //validar si el email ya exite
        if (local.getEmailUser(email.value)) {//si existe 
            email.setCustomValidity('Este email ya esta registrado');
        } else {
            if(email.value==""){
                email.setCustomValidity('Email vacio');
            }else{
                email.setCustomValidity("");
            }
        
        }

        //validar contraseña
        if (password.value!="" && confirmPass.value!="") {

            if (password.value.length<4 && confirmPass.value.length<4) {
                confirmPass.setCustomValidity('La contraseña debe tener al menos 4 caracteres.');
            } else {

                if (password.value !== confirmPass.value) {
                    confirmPass.setCustomValidity('Las contraseñas no coinciden');
                } else {
                    confirmPass.setCustomValidity('');
                }
            }

        }else{
            confirmPass.setCustomValidity("La contraseña es obligatoria");
            password.setCustomValidity("La contraseña es obligatoria");
        }

        //añado la clase de validacion de boostrap
        form.classList.add('was-validated');

        //Retornamos si el formulario completo cumple con los 'required', 'minlength', etc.
        return form.checkValidity();// devuelve true o false
    }


    public static validarLogin(form:HTMLFormElement,local:StorageService) {

        const emailInput = document.getElementById("loginEmail") as HTMLInputElement;
        const password = document.getElementById("loginPassword") as HTMLInputElement;

        // verificamos que estan los inputs
        if(emailInput.value!=""&&password.value!=""){
            if(local.getPasswordUser(password.value) && local.getEmailUser(emailInput.value)){
                local.activeLogin(emailInput.value)
                emailInput.setCustomValidity("");
                password.setCustomValidity("");
            }
    
        }else{
            emailInput.setCustomValidity("El email es obligatorio");
            password.setCustomValidity("La password es obligatoria");

        }

        //añado la clase de validacion de boostrap
        form.classList.add('was-validated');

        //Retornamos si el formulario completo cumple con los 'required', 'minlength', etc.
        return form.checkValidity();// devuelve true o false
    }
}