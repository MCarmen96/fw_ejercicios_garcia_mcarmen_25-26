import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipesCreate } from './my-recipes-create';

describe('MyRecipesCreate', () => {
  let component: MyRecipesCreate;
  let fixture: ComponentFixture<MyRecipesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecipesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
