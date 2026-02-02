import { StorageService } from "./StorageService.js";

export class Utilities{

    
    
    public static validarRegistro(form:HTMLFormElement) {

        const local:StorageService=new StorageService();
        const password=form.querySelector("#password") as HTMLInputElement;
        const confirmPass=form.querySelector("#confirmPassword") as HTMLInputElement;
        const email=form.querySelector("#email") as HTMLInputElement;
        //validar si el email ya exite
        if(local.getEmailUser(email.value)){//si existe 
            email.setCustomValidity('este email ya esta registrado');
        }else{
            email.setCustomValidity('');
        }
        //validar si coninciden las contraseñas
        if(password&&confirmPass){

            if(password.value!==confirmPass.value){
                confirmPass.setCustomValidity('Las contraseñas no coinciden');
            }else{
                confirmPass.setCustomValidity('');
            }
            //añado la clase de validacion de boostrap
            form.classList.add('was-validated');

            // 4. Retornamos si el formulario completo cumple con los 'required', 'minlength', etc.
            return form.checkValidity();
        }
    }


    public static validarLogin(){
        
    }
}