import { Component, inject,signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
@Component({
  selector: 'app-plan-week-create',
  imports: [],
  templateUrl: './plan-week-create.html',
  styleUrl: './plan-week-create.css',
})
export class PlanWeekCreate {

  private api=inject(ApiService);
  public mealsFilter=signal<any[]>([]);




  async buscarReceta(ingrediente:string){
    let datos= await this.api.getMealFilterIngredient(ingrediente);
    this.mealsFilter.set(datos);
    
  }

}
