import { Component,inject,OnInit,ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';

@Component({
  selector: 'app-meals-category',
  imports: [],
  templateUrl: './meals-category.html',
  styleUrl: './meals-category.css',
})

export class MealsCategory implements OnInit {

  public titleComp="MEALS";
  private apiService=inject(ApiService);
  private changesDetector=inject(ChangeDetectorRef);
  private _meals:MyMeal[]=[];

  public loading=true;
  public error='';


  get meals():MyMeal[]{
    return this._meals;
  }

  set meals(meal:MyMeal[]){
    this._meals=meal;
  }


  async loadMeals():Promise<void>{

    try{

      for (let index = 0; index < 8; index++) {
        const receta=await this.apiService.getMeals();
        if(receta){ this._meals.push(receta);}
      }

    }catch{

    }
  }


  async ngOnInit(){
    await this.loadMeals();
  }

}
