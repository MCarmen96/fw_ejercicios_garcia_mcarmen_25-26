import { StorageService } from "../services/storage-service";
//import { Forms } from './forms/forms';
import { ReactiveFormsModule } from '@angular/forms';

export class Util {

 /*  public static validarRegistro(form:HTMLFormElement) {
        // dividir en funciones mas pequeñas para comprobar el email y la contraseña por si se pueden reutilizar
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
    } */
}
