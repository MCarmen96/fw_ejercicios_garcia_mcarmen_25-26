import { Component,inject,OnInit,ChangeDetectorRef} from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { Category } from '../../model/category';

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

  private _categorys:Category[]=[];

  public loading=true;
  public error='';

  get categorys():Category[]{

    return this._categorys;
  }
  set categorys(category:Category[]){
    this._categorys=category;
  }

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
      this.changesDetector.detectChanges();

      }

      }catch(error){
        this.error='Error loading meals';
        this.loading=false;
        console.error(error);
      }
    }


  async loadCategorys():Promise<void>{
    try{

      const categorys=await this.apiService.getCategorys();
      console.log(categorys);
      for (let index = 0; index < categorys.length; index++) {
        const category=categorys[index];
        if(category){ this._categorys.push(category);}
      }
      this.changesDetector.detectChanges();

    }catch(error){
      this.error='Error';
      this.loading=false;
      console.error(error);
    }
  }

  async onCategoryChange(event:Event):Promise<void>{

    const selectElement=event.target as HTMLSelectElement;
    const selectedCategory=selectElement.value;// esto es el id de la categoria seleccionada
    const mealsSelected=await this.apiService.getMealsForCategorys(selectedCategory);
    console.log(mealsSelected);

    for (let index = 0; index < mealsSelected.length; index++) {
      const meal=mealsSelected[index];
      const mealDetails:MyMeal|null=await this.apiService.getMealForId(meal.idMeal.toString());
      console.log("receta categoria selecionada:", mealDetails);
      if(mealDetails){this._meals.push(mealDetails);}
    }
    //this.loadCategorys(); esto no funciona
    this.changesDetector.detectChanges();
  }
    //Angular lo ejecuta automáticamente una vez, justo después de crear el componente.
  async ngOnInit(){
    await this.loadMeals();
    await this.loadCategorys();

  }

}
