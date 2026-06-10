import { Component,Input, signal,inject } from '@angular/core';
import { StorageService } from '../../services/storage-service';
import { WeeklyPlan } from '../../model/weekly-plan';
import { Util } from '../../model/util';
@Component({
  selector: 'app-plan-week-list',
  imports: [],
  templateUrl: './plan-week-list.html',
  styleUrl: './plan-week-list.css',
})
export class PlanWeekList {

    private local = inject(StorageService);
    public planes = signal<WeeklyPlan[]>([]);
    public semanaActual = Util.getISOWeek(new Date());
    @Input() updateList:number=0;

  ngOnChanges(): void {
    // Se ejecuta cada vez que updateList cambia
    // Es decir, cada vez que el padre le pasa un valor nuevo
    const userId = this.local.getSession()?.userId;
    if (userId) {
      this.planes.set(this.local.getWeeklyPlans(userId));
    }
  }
  public eliminarPlan(planId: string): void {
    if (!confirm('¿Seguro que quieres eliminar este plan?')) return;
    const ok = this.local.deletePlan(planId);
    if (ok) {
      this.planes.update(planes => planes.filter(p => p.id !== planId));
    }
  }
}

