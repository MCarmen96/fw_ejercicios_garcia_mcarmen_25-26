interface Receta{
    idMeal:number;
    strMeal:string;
    strArea:string;
    strCategory:string;
    strMealThumb:string;
    ingredients:{name:string; measure:string}[]; // array de objetos

}