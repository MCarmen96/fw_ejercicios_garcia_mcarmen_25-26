import { Component, inject,signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { StorageService } from '../../services/storage-service';
import { Util } from '../../model/util';

@Component({
  selector: 'app-plan-week-create',
  imports: [],
  templateUrl: './plan-week-create.html',
  styleUrl: './plan-week-create.css',
})
export class PlanWeekCreate {

  private api=inject(ApiService);
  private storage = inject(StorageService);

  public planId = signal<string>('');
  public planIdError = signal<string>('');
  public resultadosBusqueda=signal<any[]>([]);
  public diaSeleccionado = signal<string>('');
  public tipoSeleccionado = signal<'lunch' | 'dinner' | ''>('');

  async buscarReceta(ingrediente:string){
    // si no hay dia seleciona y tipo selecionado no busco
    if (!this.diaSeleccionado() || !this.tipoSeleccionado()) return;

    let datos= await this.api.getMealFilterIngredient(ingrediente.trim());
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
      const planExistente = this.storage.getWeeklyPlans(userId).some(p => p.id === id);
      this.planIdError.set(
        planExistente ? `Ya tienes un plan para ${id}. Elige otra fecha.` : ''
      );
    }
  }


}
