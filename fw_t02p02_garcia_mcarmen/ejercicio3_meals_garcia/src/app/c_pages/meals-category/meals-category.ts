import { Component,inject,OnInit,signal} from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { Category } from '../../model/category';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import { NgClass } from '@angular/common';
import { MealsSave } from '../meals-save/meals-save';
@Component({
  selector: 'app-meals-category',
  imports: [RouterLink,NgClass,MealsSave],
  templateUrl: './meals-category.html',
  styleUrl: './meals-category.css',
})

export class MealsCategory implements OnInit {

  public titleComp="MEALS";
  private apiService=inject(ApiService);
  private authService=inject(AuthService);
  private local=inject(StorageService);

  private _meals= signal<MyMeal[]>([]);
  public mealsSaved= signal<MyMeal[]>([]);
  public selectedCategory:string="0";
  private _categorys=signal<Category[]>([]);
  public isAuthenticated=this.authService.isAuthenticated;
  public isMealsSaved=this.local.isMealsSaved;
  public loading=true;
  public error='';
  public botnClick:boolean=false;

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

  /* get mealsSave():MyMeal[]{
    return this._mealsSaved();
  }

  set mealsSave(mealSave:MyMeal[]){
    this._mealsSaved.set(mealSave);
  } */


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
    const category=selectElement.value;
    this.selectedCategory=category;
    this.botnClick=false;
    if(category===""){
      this.loadMeals()
    }else{
      this.searchByCategory(category);
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

  saveCategory(){
    this.local.saveCategory(this.selectedCategory);
    this.botnClick=true;
  }



  //Angular lo ejecuta automáticamente una vez, justo después de crear el componente.
  async ngOnInit(){
    await this.loadMeals();
    await this.loadCategorys();

  }

}
