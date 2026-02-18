import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { min } from 'rxjs';

import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });
   // * cada "it"cd son una prueba, se tiene que poner una descripcion
 /*  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, mi_app_03');
  }); */
/*
  it('should be true', () => {
    expect(true).toBe(true);
  });

  it('should be 4', () => {
    expect(2+2).toBe(4);
  });

 it('should not divide by 0', () => {
    let a = 2;
    let b = 1;
    let result = a / b;
    expect(result).not.toBe(Infinity);
  });
  // si el primer expect falla no sigue adelante se para
  it('should stop test execution when an expect fails', () => {
    const a = 2;
    const b = 2;

    // Este expect es correcto
    expect(a - b).toBe(0);

    // Este expect FALLA
    expect(a + b).toBe(5);

    // Este expect NO se ejecuta nunca
    expect(true).toBe(true);
  }); */

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

 /*  it('should keep the title and subTitle unchanged', () => {

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.subTitle.set('IES Gregorio Prieto');

    console.log('>>>Privado:', app['title']());
    console.log('>>>Publico:', app.subTitle());
    console.log('>>>Publico:', app.year);
    console.log('>>>Publico:', app.showTitleAndsubTitle());

    expect(app.year).toBe(new Date().getFullYear());
    expect(app['title']()).toBe('mi_app_03');
    expect(app.subTitle()).toBe('DWEC & Frameworks');

  }); */

  it('should return formatted title, subtitle and year', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const result = app.showTitleAndsubTitle();

    expect(result).toContain('DWEC & Frameworks');
  });


 it('should render a router-outlet inside section.content', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;// le pides que te de el dom virtual apra ver que ha pintado

    console.log('>>>Render:', compiled.innerHTML);

    // router-outlet existe
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();

    // router-outlet está dentro de section.content
    const contentSection = compiled.querySelector('section.content');
    console.log('>>>Render section.content:', contentSection?.innerHTML);
    console.log('>>>Render class section.content:',
                      contentSection?.classList.value);

    expect(contentSection).toBeTruthy();
    expect(contentSection?.querySelector('router-outlet')).toBeTruthy();
  });



});
