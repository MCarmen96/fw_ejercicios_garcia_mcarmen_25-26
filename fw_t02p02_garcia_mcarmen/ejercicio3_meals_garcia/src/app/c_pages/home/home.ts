import { Component } from '@angular/core';
import { inject,Injectable } from '@angular/core';
import { MealsCategory } from '../meals-category/meals-category';
import { MealsSave } from '../meals-save/meals-save';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [MealsCategory, MealsSave],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  public authService=inject(AuthService);
  public isAuthenticated = this.authService.isAuthenticated;
 /*  ngOnInit():void{
    if (this.authService.isSession() !== null) {
      this.isAuthenticated=true;
      console.log('¡Hay una sesión activa!');
    }
}*/






}
