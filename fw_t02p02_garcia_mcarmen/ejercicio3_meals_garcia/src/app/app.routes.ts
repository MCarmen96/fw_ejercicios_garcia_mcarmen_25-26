import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { Layout } from './c_layout/layout/layout';
import { Home } from './c_pages/home/home';
import { Details } from './c_pages/details/details';
import { PlanWeek } from './c_pages/plan-week/plan-week';
import { Login } from './c_pages/login/login';
import { NotFound } from './c_pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { MyRecipes } from './c_pages/my-recipes/my-recipes';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'details/:id', component: Details,canActivate:[authGuard]},
      { path: 'plan-week', component: PlanWeek,canActivate:[authGuard]},
      { path: 'my-recipes', component: MyRecipes, canActivate: [authGuard] }


    ],

  },
    { path: 'login', component: Login },
    { path: '**', component: NotFound },

];
