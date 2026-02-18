export interface MyMeal {

  idMeal: number;
  strMeal: string;//nombre de la receta
  strCategory: string;
  strArea: string;
  strMealThumb: string;//imagen tamaño mediana
  ingredients:{name:string; measure:string}[];

  // Definimos el array como un array de objetos con esas dos propiedades específicas
  //categorias: { idCategory: any, strCategory: any }[] = [];

}
