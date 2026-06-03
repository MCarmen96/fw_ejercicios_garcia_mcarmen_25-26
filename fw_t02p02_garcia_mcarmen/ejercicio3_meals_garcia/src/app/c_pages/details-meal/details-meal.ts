import { Component,Input,SimpleChanges,inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-details-meal',
  imports: [],
  templateUrl: './details-meal.html',
  styleUrl: './details-meal.css',
})

export class DetailsMeal {

  @Input() public id:string | undefined;

  private apiService=inject(ApiService);
  private authService=inject(AuthService);
  public meal=signal<MyMeal|null>(null);
  public isAuthenticated =this.authService.isAuthenticated;

  ngOnChanges(changes:SimpleChanges){

    if(changes['id']&&this.id){
      this.cargarReceta(this.id);
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

}
