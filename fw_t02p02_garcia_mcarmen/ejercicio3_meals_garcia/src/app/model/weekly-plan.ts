import { WeeklyPlanDay } from "./weekly-plan-day";

export interface WeeklyPlan {
  id:string,
  userId:number,
  days:WeeklyPlanDay[]
}
