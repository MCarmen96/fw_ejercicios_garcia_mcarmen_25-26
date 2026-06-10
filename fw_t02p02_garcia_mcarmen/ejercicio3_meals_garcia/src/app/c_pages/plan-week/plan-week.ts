import { Component, signal } from '@angular/core';
import { PlanWeekCreate } from "../plan-week-create/plan-week-create";
import { PlanWeekList } from '../plan-week-list/plan-week-list';

@Component({
  selector: 'app-plan-week',
  imports: [PlanWeekCreate,PlanWeekList],
  templateUrl: './plan-week.html',
  styleUrl: './plan-week.css',
})
export class PlanWeek {
  public updateList=signal<number>(0);
  cargarWeekPlans(event:boolean){
    if(event){
      this.updateList.update(n => n + 1);
   
    }
  }
}
