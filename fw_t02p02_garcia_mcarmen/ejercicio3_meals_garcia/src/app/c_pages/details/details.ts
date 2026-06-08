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

    //public login= signal<boolean>(false);
    public idUser:number=-1;
    public authService=inject(AuthService);
    public isAuthenticated =this.authService.isAuthenticated;

    public exitoGuardado=signal<boolean>(false);
    route:ActivatedRoute=inject(ActivatedRoute);
    public isSave:boolean=false;
    constructor(){

      const session=this.authService.isSession();
      if(session!=null){
        //this.login.set(true);
        this.idUser=session.userId;
      }

      const idUrl=this.route.snapshot.params['id'];
      this.idReceta.set(idUrl);
    }

    mostrarExito(exito:boolean){
      if(exito){
        this.exitoGuardado.set(true);
      }

    }

    mostrarComentario(exito:boolean){
        if(exito){
        this.isSave=true;
      }else{
        this.isSave=false;
      }
    }

}
