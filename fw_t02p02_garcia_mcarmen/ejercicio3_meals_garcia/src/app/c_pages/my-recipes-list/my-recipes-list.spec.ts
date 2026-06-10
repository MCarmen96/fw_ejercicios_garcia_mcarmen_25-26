import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipesList } from './my-recipes-list';

describe('MyRecipesList', () => {
  let component: MyRecipesList;
  let fixture: ComponentFixture<MyRecipesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecipesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
