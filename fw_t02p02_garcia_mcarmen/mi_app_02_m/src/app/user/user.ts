import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public userName:string="MAKI";
  public sukuna:string="SUKUNA";

  public characters = [
    { id: 0, name: 'Megumi' },
    { id: 1, name: 'Choso' },
    { id: 2, name: 'Itadori' },
    { id: 3, name: 'Sukuna' },
    { id: 4, name: 'Goyo' },
    { id: 5, name: 'Maito' },
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


}
