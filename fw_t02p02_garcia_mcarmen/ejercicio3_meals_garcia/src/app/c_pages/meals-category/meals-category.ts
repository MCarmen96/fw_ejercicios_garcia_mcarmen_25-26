import { Component,inject,OnInit,signal} from '@angular/core';
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
  //private changesDetector=inject(ChangeDetectorRef);
  private _meals= signal<MyMeal[]>([]);

  private _categorys=signal<Category[]>([]);

  public loading=true;
  public error='';

   get categorys():Category[]{

    return this._categorys();
  }
  set categorys(category:Category[]){
    this._categorys.set(category);
  }

  get meals():MyMeal[]{
    return this._meals();
  }

  set meals(meal:MyMeal[]){
    this._meals.set(meal);
  }


  async loadMeals():Promise<void>{

    try{
      const arrayAux:MyMeal[]=[];
      for (let index = 0; index < 8; index++) {
        const receta=await this.apiService.getMeals();
        if(receta){ arrayAux.push(receta);}
        //this.changesDetector.markForCheck();

        console.log(arrayAux);


      }
       this._meals.set(arrayAux);

      }catch(error){
        this.error='Error loading meals';
        this.loading=false;
        console.error(error);
      }
    }


  async loadCategorys():Promise<void>{
    try{
      const arrayAux:Category[]=[];
      const categorys=await this.apiService.getCategorys();
      //console.log(categorys);
      for (let index = 0; index < categorys.length; index++) {
        const category=categorys[index];
        if(category){ arrayAux.push(category);}

        this._categorys.set(arrayAux);

      }


    }catch(error){
      this.error='Error';
      this.loading=false;
      console.error(error);
    }
  }

  async onCategoryChange(event:Event):Promise<void>{

    const selectElement=event.target as HTMLSelectElement;
    const selectedCategory=selectElement.value;// esto es el id de la categoria seleccionada

    if(selectedCategory===""){
      this.loadMeals()
    }else{
      this.searchByCategory(selectedCategory);
    }



  }

  async searchByCategory(category:string){

    const mealsSelected=await this.apiService.getMealsForCategorys(category);
    const arrayAux:MyMeal[]=[];
    console.log(mealsSelected);
        for (let index = 0; index <8; index++) {
          const meal=mealsSelected[index];
          const mealDetails:MyMeal|null=await this.apiService.getMealForId(meal.idMeal.toString());
          //console.log("receta categoria selecionada:", mealDetails);
          if(mealDetails){arrayAux.push(mealDetails);}
        }
        this._meals.set(arrayAux);

  }
    //Angular lo ejecuta automáticamente una vez, justo después de crear el componente.
  async ngOnInit(){
    await this.loadMeals();
    await this.loadCategorys();

  }

}
