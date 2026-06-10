import { Component, inject, signal, Input, OnChanges } from '@angular/core';
import { StorageService } from '../../services/storage-service';
import { MyOwnRecipe } from '../../model/my-own-recipe';

@Component({
  selector: 'app-my-recipes-list',
  imports: [],
  templateUrl: './my-recipes-list.html',
  styleUrl: './my-recipes-list.css',
})
export class MyRecipesList implements OnChanges {

  private local = inject(StorageService);

  @Input() updateList: number = 0;

  public recipes = signal<MyOwnRecipe[]>([]);
  public selectedRecipe = signal<MyOwnRecipe | null>(null);

  ngOnChanges(): void {
    const userId = this.local.getSession()?.userId;
    if (userId) {
      this.recipes.set(this.local.getOwnRecipes(userId));
    }
  }

  public verDetalle(recipe: MyOwnRecipe): void {
    this.selectedRecipe.set(recipe);
  }

  public cerrarDetalle(): void {
    this.selectedRecipe.set(null);
  }

  public eliminarReceta(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar esta receta?')) return;
    const ok = this.local.deleteOwnRecipe(id);
    if (ok) {
      this.recipes.update(arr => arr.filter(r => r.id !== id));
      if (this.selectedRecipe()?.id === id) {
        this.selectedRecipe.set(null);
      }
    }
  }
}