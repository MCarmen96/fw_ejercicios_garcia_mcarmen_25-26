export class Utilities{

    
    public static validarRegistro(form:HTMLFormElement) {
        
        const password=form.querySelector("#password") as HTMLInputElement;
        const confirmPass=form.querySelector("#confirmPassword") as HTMLInputElement;

        if(password&&confirmPass){

            if(password.value!==confirmPass.value){
                
            }
        }
    }
}