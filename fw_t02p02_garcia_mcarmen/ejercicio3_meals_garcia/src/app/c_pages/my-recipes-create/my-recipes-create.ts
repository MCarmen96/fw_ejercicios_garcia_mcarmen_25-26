import { Component, inject, signal, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { StorageService } from '../../services/storage-service';
import { MyOwnRecipe, Ingredient } from '../../model/my-own-recipe';
import { Util } from '../../model/util';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-recipes-create',
  imports: [ReactiveFormsModule],
  templateUrl: './my-recipes-create.html',
  styleUrl: './my-recipes-create.css',
})
export class MyRecipesCreate implements OnInit {

  private api = inject(ApiService);
  private local = inject(StorageService);
  private fb = inject(FormBuilder);

  @Output() recipeSaved = new EventEmitter<boolean>();

  // Datos para los selects
  public categorias = signal<string[]>([]);
  public areas = signal<string[]>([]);

  // Arrays dinámicos para ingredientes e imágenes
  public ingredientes = signal<Ingredient[]>([]);
  public imagenes = signal<string[]>([]);
  get nombre() { return this.recipeForm.get('nombre'); }
  get categoria() { return this.recipeForm.get('categoria'); }
  get area() { return this.recipeForm.get('area'); }
  get instrucciones() { return this.recipeForm.get('instrucciones'); }

  // Formulario reactivo solo para los campos de texto
  public recipeForm: FormGroup = this.fb.group({
    nombre:        ['', Validators.required],
    categoria:     ['', Validators.required],
    area:          ['', Validators.required],
    instrucciones: ['', Validators.required],
  });

  async ngOnInit(): Promise<void> {
    const cats = await this.api.getCategorys();
    this.categorias.set(cats.map(c => c.strCategory));

    const areas = await this.api.getAreas();
    this.areas.set(areas);
  }

  public addIngrediente(name: string, measure: string): void {
    if (!name.trim() || !measure.trim()) return;
    const aux = this.ingredientes();
    aux.push({ name: name.trim(), measure: measure.trim() });
    this.ingredientes.set([...aux]);
  }

  public removeIngrediente(index: number): void {
    this.ingredientes.update(arr => arr.filter((_, i) => i !== index));
  }

  public addImagen(url: string): void {
    if (!url.trim()) return;
    const aux = this.imagenes();
    aux.push(url.trim());
    this.imagenes.set([...aux]);
  }

  public removeImagen(index: number): void {
    this.imagenes.update(arr => arr.filter((_, i) => i !== index));
  }

  public guardarReceta(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }
    if (this.ingredientes().length === 0) return;
    if (this.imagenes().length === 0) return;

    const userId = this.local.getSession()!.userId;
    const recetasExistentes = this.local.getOwnRecipes(userId);

    const nueva: MyOwnRecipe = {
      id: Util.generateId(recetasExistentes),
      userId: userId,
      name: this.recipeForm.value.nombre,
      category: this.recipeForm.value.categoria,
      area: this.recipeForm.value.area,
      instructions: this.recipeForm.value.instrucciones,
      ingredients: this.ingredientes(),
      images: this.imagenes()
    };

    const ok = this.local.saveOwnRecipe(nueva);
    if (ok) {
      this.recipeForm.reset();
      this.ingredientes.set([]);
      this.imagenes.set([]);
      this.recipeSaved.emit(true);
    }
  }
}
