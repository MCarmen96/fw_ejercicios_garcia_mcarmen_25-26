import { Component, inject,ChangeDetectionStrategy,computed,input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl,Validators,AbstractControl, ValidationErrors} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class Login {
  // Controladores para saber si el usuario ha dado clic en "Enviar"
  public loginSubmitted = false;
  public registerSubmitted = false;
  public registroExitoso=false;
  public errorCreacion =input<string>();
  private readonly authService=inject(AuthService);
  private router = inject(Router);

  public mostrarErrorGlobal = computed(() => this.errorCreacion() === 'true');

  public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  /*
  Angular es muy ordenado. Como un cajón individual (FormControl) y una cajonera entera (FormGroup) son cosas distintas,
  Angular inventó una palabra genérica para referirse a "cualquier cosa que sirva para controlar datos".
  Esa palabra es AbstractControl */
  public registerForm=new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    passwordConfirm:new FormControl('',[Validators.required])
  },{
    validators:this.passwordCoinciden.bind(this)
  })

  public handleSubmitLogin() {
    this.loginSubmitted=true;
  
    if(this.loginForm.valid){
      console.log("Entra en valid del formulario...")
      this.authService.authLogin(this.loginForm.value.email as string);
    }

  }

  /* con estas 2 funciones devuelvo el input directamente asi puedo acceder a su valor */
  public get password() { return this.registerForm.get('password'); }
  public get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }

  public handleSubmitRegister(){

    this.registerSubmitted = true; // Marcamos que intentó enviar el registro

    if (this.registerForm.valid) {
        const new_user: User = {
                    id: this.authService.getLastUser(),//funcion incremental del id
                    name:this.registerForm.get('name')?.value as string,
                    email: this.registerForm.get('email')?.value as string,
                    password: this.registerForm.get('password')?.value as string,
                };
      if(this.authService.authRegister(new_user)){
          this.registroExitoso=true;
      }else{
        // aqui añadimos la query en el login
        this.router.navigate(['/login'], { queryParams: { errorCreacion: 'true' } });
      }
      console.log('Datos de registro válidos:', this.registerForm.value);
    }

  }
  // esto es el input que se le pase al llamar a la funcion control: AbstractControl
  public getValidationClass(control: AbstractControl|null,isSubmitted: boolean): string {
    if (!isSubmitted) return ''; // Si no ha dado a enviar, no pintes nada todavía
    if (!control) return '';

    return control.valid ? 'is-valid' : 'is-invalid'; // Devuelve la clase correspondiente
  }

  public getValidationClassConfirmPassword():string{
    if(!this.registerSubmitted){// si no ha pulsado crear el formulario todavia
      return "";
    }

    if(this.passwordConfirm?.errors){
      return "is-invalid";
    }

    if(this.registerForm.errors?.['passwordNoCoinciden']){
      return "is-invalid";
    }

    return 'is-valid';

  }

  public passwordCoinciden(group:AbstractControl):ValidationErrors | null{
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;

    // ¿Son idénticas?
    // Si sí, devolvemos null (que significa "sin errores") [cite: 175]
    // Si no, creamos el error global 'passwordsNoCoinciden'
    return password === passwordConfirm ? null : { passwordNoCoinciden: true };
  }




}
