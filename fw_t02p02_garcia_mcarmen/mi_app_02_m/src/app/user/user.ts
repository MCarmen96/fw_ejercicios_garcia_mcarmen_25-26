
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

  public userName:string="MAKI";
  public sukuna:string="SUKUNA";

  @Input() name:string="MAI";

  public logoUrl = '/imgs/logo.svg';
  public logoAlt = 'Angular logo';
  public titleComponent="USER";

}
