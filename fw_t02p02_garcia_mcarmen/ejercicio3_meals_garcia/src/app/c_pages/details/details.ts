import { DetailsSave } from './../details-save/details-save';
import { Component, input, inject, signal,effect } from '@angular/core';
import { DetailsMeal } from "../details-meal/details-meal";
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [DetailsMeal,DetailsSave],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {

    public idReceta = signal<string | undefined>(undefined);

    public login= signal<boolean>(false);
    public auth=inject(AuthService);
    route:ActivatedRoute=inject(ActivatedRoute);

    constructor(){

      if(this.auth.isSession()){
        this.login.set(true);
      }

      const idUrl=this.route.snapshot.params['id'];
      this.idReceta.set(idUrl);
    }

}
