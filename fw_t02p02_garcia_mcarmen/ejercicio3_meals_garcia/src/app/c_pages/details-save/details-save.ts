import { Component,Input,SimpleChanges,inject,Output,EventEmitter} from '@angular/core';

import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserMeal } from '../../model/user-meal';
import { StorageService } from '../../services/storage-service';
@Component({
  selector: 'app-details-save',
  imports: [ReactiveFormsModule],
  templateUrl: './details-save.html',
  styleUrl: './details-save.css',
})
export class DetailsSave {
  // se declaran asi por que vienen del padre Details
  @Input() public idReceta:string="";
  @Input() public idUser:number=-1;
  @Output() exitoGuardado=new EventEmitter<boolean>(false);
  private local=inject(StorageService);

  public valoracionForm=new FormGroup({
    textoComentario:new FormControl("",[Validators.required,Validators.minLength(5)]),
    yaCocinada: new FormControl("1",[Validators.required]),
    puntuacion: new FormControl(0,[Validators.required])
  })


  public guardarValoracion(){
    if (this.valoracionForm.invalid) {
        // o la clase que tiene puesta alberto devolviendo la clase si el input no es valido
      this.valoracionForm.markAllAsTouched(); // 🚀 Disparador visual para el HTML
      return;
    }else{



      let valueCocinada=this.valoracionForm.get('yaCocinada')?.value
      let cocinada:string=valueCocinada==="2" ? "LA_HE_HECHO":"QUIERO_HACERLA";
      let puntosReceta=Number(this.valoracionForm.get('puntuacion')?.value);
      let texto=this.valoracionForm.get('textoComentario')?.value ?? '';

      const comentario:UserMeal={
          userId:this.idUser,
          mealId:Number(this.idReceta),
          saveDate:new Date(),
          status:cocinada,
          notes:texto,
          rating:puntosReceta
        }

        if(this.local.saveCommentMeal(this.idUser,comentario)){
            this.exitoGuardado.emit(true);
        }




    }
  }
}
