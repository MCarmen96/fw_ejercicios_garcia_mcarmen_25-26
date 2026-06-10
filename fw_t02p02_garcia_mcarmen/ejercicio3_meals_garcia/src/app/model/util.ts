import { StorageService } from "../services/storage-service";
//import { Forms } from './forms/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MyOwnRecipe } from "./my-own-recipe";
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

    static getISOWeek(date: Date): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    // Mueve 'd' al jueves de esa semana (el pivote)
    // (d.getDay() + 6) % 7  convierte domingo=0 a domingo=6, lunes=0
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);

    // El 4 de enero siempre está en la semana 1
    const semana1 = new Date(d.getFullYear(), 0, 4);

    // Cuenta cuántas semanas hay entre semana1 y el jueves de nuestra semana
    const numSemana = 1 + Math.round(
      ((d.getTime() - semana1.getTime()) / 86400000    // diferencia en días
        - 3 + (semana1.getDay() + 6) % 7) / 7         // ajuste al lunes de semana1
    );

    // padStart(2, '0') convierte "1" en "01", "9" en "09", etc.
    return `${d.getFullYear()}-W${numSemana.toString().padStart(2, '0')}`;
  }


  static generateId(recipes: MyOwnRecipe[]): number {
    if (recipes.length === 0) return 1;
    return recipes[recipes.length - 1].id + 1;
  }
}
