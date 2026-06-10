export interface Ingredient {
  name: string;
  measure: string;
}

export interface MyOwnRecipe {
  id: number;                 
  userId: number;
  name: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: Ingredient[];
  images: string[];            
}
