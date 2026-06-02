import { DetailsSave } from './../details-save/details-save';
import { Component, input, inject, signal,effect } from '@angular/core';
import { DetailsMeal } from "../details-meal/details-meal";
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute } from '@angular/router';
import { UserMeal } from '../../model/user-meal';


@Component({
  selector: 'app-details',
  imports: [DetailsMeal,DetailsSave],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {

    public idReceta = signal<string>('');

    public login= signal<boolean>(false);
    public idUser:number=-1;
    public auth=inject(AuthService);
    route:ActivatedRoute=inject(ActivatedRoute);

    constructor(){

      const session=this.auth.isSession();
      if(session!=null){
        this.login.set(true);
        this.idUser=session.userId;
      }

      const idUrl=this.route.snapshot.params['id'];
      this.idReceta.set(idUrl);
    }

}
