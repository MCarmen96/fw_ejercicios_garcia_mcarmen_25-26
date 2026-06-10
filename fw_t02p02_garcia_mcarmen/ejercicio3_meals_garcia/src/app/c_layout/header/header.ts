import { Component,inject,computed} from '@angular/core';
import { LoginWidget } from '../login-widget/login-widget';
import { AuthService } from '../../services/auth-service';
import { LogoutWidget } from "../logout-widget/logout-widget";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [LoginWidget, LogoutWidget,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

    public authService=inject(AuthService);
    public isAuthenticated =this.authService.isAuthenticated;


  public user = computed(() => {
    if (this.isAuthenticated()) {
      return this.authService.isSession()?.name ?? '';
    }
    return '';
  });

  /* ngOnInit():void{
    if (this.authService.isSession() !== null) {
      this.user=this.authService.isSession()?.name;
      //this.isAuthenticated=true;
      //console.log('¡Hay una sesión activa!');
    }
  }

  public cambiarEstadoLogin(estado:boolean):void{
    //this.isAuthenticated=false;
    this.user="";

  } */
}
