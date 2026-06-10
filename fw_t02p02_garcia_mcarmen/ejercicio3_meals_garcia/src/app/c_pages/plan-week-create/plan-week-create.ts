import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { StorageService } from '../../services/storage-service';
import { Util } from '../../model/util';
import { WeeklyPlanDay } from '../../model/weekly-plan-day';

@Component({
  selector: 'app-plan-week-create',
  imports: [],
  templateUrl: './plan-week-create.html',
  styleUrl: './plan-week-create.css',
})
export class PlanWeekCreate {

  private api = inject(ApiService);
  private storage = inject(StorageService);

  public planId = signal<string>('');
  public planIdError = signal<string>('');
  public resultadosBusqueda = signal<any[]>([]);
  public diaSeleccionado = signal<string>('');
  public tipoSeleccionado = signal<'lunch' | 'dinner' | ''>('');

  public planTemporal = signal<WeeklyPlanDay[]>([]);

  async buscarReceta(ingrediente: string) {
    // si no hay dia seleciona y tipo selecionado no busco
    if (!this.diaSeleccionado() || !this.tipoSeleccionado()) return;

    let datos = await this.api.getMealFilterIngredient(ingrediente.trim());
    this.resultadosBusqueda.set(datos);

  }

  public onFechaChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.planId.set('');
      this.planIdError.set('');
      return;
    }

    // Añadimos T12:00:00 para evitar problemas de zona horaria
    // Sin esto, new Date('2026-06-10') puede crear el día anterior en UTC-X
    const fecha = new Date(input.value + 'T12:00:00');
    const id = Util.getISOWeek(fecha);
    this.planId.set(id);

    // Validar que no exista ya un plan con ese ID
    const userId = this.storage.getSession()?.userId;
    if (userId) {
      //aplicamos a la lista de los planes semanales de ese usaurio el some
      const planExistente = this.storage.getWeeklyPlans(userId).some(p => p.id === id);
      this.planIdError.set(
        planExistente ? `Ya tienes un plan para ${id}. Elige otra fecha.` : ''
      );
    }
  }

  public addAlPlan(meal: any): void {
    const dia = this.diaSeleccionado();
    const tipo = this.tipoSeleccionado();
    if (!dia || !tipo) return;

    const id = Number(meal.idMeal);

    // Sacas el array actual del signal, trabajas con él normal
    const arrayAuxiliar = this.planTemporal();
    const diaExistente = arrayAuxiliar.find(d => d.day === dia);

    if (diaExistente) {
      if (tipo === 'lunch') {
        diaExistente.lunchMealId = id;
        diaExistente.lunchMealName = meal.strMeal;
      } else {
        diaExistente.dinnerMealId = id;
        diaExistente.dinnerMealName = meal.strMeal;
      }
    } else {
      const nuevo: WeeklyPlanDay = { day: dia };
      if (tipo === 'lunch') {
        nuevo.lunchMealId = id;
        nuevo.lunchMealName = meal.strMeal;
      } else {
        nuevo.dinnerMealId = id;
        nuevo.dinnerMealName = meal.strMeal;
      }
      arrayAuxiliar.push(nuevo); // push normal, sin magia
    }

    // Al final, metes el array entero de golpe en el signal
    this.planTemporal.set([...arrayAuxiliar]);
    /*
    Creas un array nuevo en otra dirección de memoria con los mismos elementos.
    El signal compara → objeto distinto → hay cambio, re-renderiza.
   */

    this.tipoSeleccionado.set('');
    this.resultadosBusqueda.set([]);
  }

  public quitarDia(dia: string): void {
  this.planTemporal.update(plan => plan.filter(d => d.day !== dia));
}

}
