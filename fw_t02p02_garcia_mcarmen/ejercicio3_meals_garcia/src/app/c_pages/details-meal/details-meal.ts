import { Component,Input,SimpleChanges,inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import { UserMiniMeal } from '../../model/user-mini-meal';

@Component({
  selector: 'app-details-meal',
  imports: [],
  templateUrl: './details-meal.html',
  styleUrl: './details-meal.css',
})

export class DetailsMeal {

  @Input() public idReceta:string | undefined;

  private apiService=inject(ApiService);
  private authService=inject(AuthService);
  public meal=signal<MyMeal|null>(null);
  public mealSave=signal<boolean>(false);
  public isAuthenticated =this.authService.isAuthenticated;
  private local=inject(StorageService);
  /* Esta funcion es la que recoje el id que le pasa el padre esta escuchando en todo momento cuando cambia el id */
  ngOnChanges(changes:SimpleChanges){

    if(changes['idReceta']&&this.idReceta){
      this.cargarReceta(this.idReceta);
    }
  }


  public cargarReceta(idReceta:string){
        this.apiService.getMealForId(idReceta)
        .then((resultado:MyMeal|null)=>{
              this.meal.set(resultado);
          })
        .catch((err:any)=>{
          console.log(err);
        })
  }

  public guardarReceta(){
    const recetaActual = this.meal();
    if(!recetaActual)return;
    // si no esta guardada
    if (!this.mealSave()) {
      let miniMeal:UserMiniMeal={
        id:recetaActual.idMeal,
        name:recetaActual.strMeal,
        image_small:recetaActual.strMealThumb
      }
      if(this.local.guardarReceta(miniMeal)){
          this.mealSave.set(true);
      }
    }else{
      let id:number=Number(recetaActual.idMeal);
      this.local.quitarRecetaGuardada(id);
      this.mealSave.set(false);
    }

   

  }


}
