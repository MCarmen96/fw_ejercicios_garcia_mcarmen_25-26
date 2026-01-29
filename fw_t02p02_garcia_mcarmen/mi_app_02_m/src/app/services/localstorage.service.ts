import { Injectable } from '@angular/core';
import { IFilmRating } from '../interfaces/i-film-rating.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  
  private static readonly KEY_MY_FILMS = 'my_films';

  public saveFilms(films: IFilmRating[]): void {

    try {
      const jsonData = JSON.stringify(films);
      localStorage.setItem(LocalstorageService.KEY_MY_FILMS, jsonData);
    } catch (error) {
      console.error('Error saving films to localStorage:', error);
    }

  }


  public getFilms(): IFilmRating[] {
    try {

      const jsonData =localStorage.getItem(LocalstorageService.KEY_MY_FILMS);
      return jsonData ? JSON.parse(jsonData) : [];

    } catch (error) {
      console.error('Error getting films from localStorage:', error);
      return [];
    }
  }

  public clearFilms(): void {
    localStorage.removeItem(LocalstorageService.KEY_MY_FILMS);
  }
}


