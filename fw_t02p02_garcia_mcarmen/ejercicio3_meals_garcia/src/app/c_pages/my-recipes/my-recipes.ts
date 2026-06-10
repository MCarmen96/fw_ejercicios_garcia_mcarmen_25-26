import { Component, signal } from '@angular/core';
import { MyRecipesCreate } from '../my-recipes-create/my-recipes-create';
import { MyRecipesList } from '../my-recipes-list/my-recipes-list';

@Component({
  selector: 'app-my-recipes',
  imports: [MyRecipesCreate, MyRecipesList],
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.css',
})
export class MyRecipes {
  public updateList = signal<number>(0);

  public onRecipeSaved(event: boolean): void {
    if (event) {
      this.updateList.update(n => n + 1);
    }
  }
}