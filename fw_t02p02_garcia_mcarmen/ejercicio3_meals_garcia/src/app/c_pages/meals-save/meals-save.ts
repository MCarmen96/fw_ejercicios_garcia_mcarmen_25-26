import { Component,inject,signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-meals-save',
  imports: [RouterLink],
  templateUrl: './meals-save.html',
  styleUrl: './meals-save.css',
})
export class MealsSave {
    private apiService=inject(ApiService);
    private authService=inject(AuthService);
    private local=inject(StorageService);
    public mealsSaved= signal<MyMeal[]>([]);

    async mealsSavedLoad(){
      this.mealsSaved.set([]);
    try{
      const arrayAux:MyMeal[]=[];
      const recetasGuardadasLocal=this.local.getMiniMeaslUser();
      if (Array.isArray(recetasGuardadasLocal) && recetasGuardadasLocal.length > 0) {


      // Si hay 2 recetas, dará 2 vueltas. Si hay 10 recetas, solo dará 4 vueltas.
      const limiteVueltas = Math.min(4, recetasGuardadasLocal.length);
      // coge el valor minimo de los 2 valores dados
      for (let index = 0; index < limiteVueltas; index++) {

        if (recetasGuardadasLocal[index]) {
          let idAbuscar = recetasGuardadasLocal[index].id.toString();
          const receta = await this.apiService.getMealForId(idAbuscar);

          if (receta) {
            arrayAux.push(receta);
          }
        }
      }
    }

      this.mealsSaved.set(arrayAux);

      }catch(error){

        console.error(error);
      }
  }

  async ngOnInit(){
    await this.mealsSavedLoad();
  }
}
