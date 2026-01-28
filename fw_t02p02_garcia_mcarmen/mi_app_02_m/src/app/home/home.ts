import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  

  public isServerRunning=false;


  public characters = [
    { id: 0, name: 'Megumi' },
    { id: 1, name: 'Choso' },
    { id: 2, name: 'Itadori' },
    { id: 3, name: 'Sukuna' },
    { id: 4, name: 'Goyo' },
    { id: 5, name: 'Geto' },
  ];
  public isEditable = true;
  public message = '';
  public boxClass = 'box-class';

  public onMouseOverAction(){
    this.message = "Let's go!";
  }
  public onMouseOutAction(){
    this.message = "";
  }

  public itemsParent: string[] = [];
  public addItemParent(newItem: string) {
    this.itemsParent.push(newItem);
  }

  public titleComp = 'HOME CARMEN 🦁🦁';
}
