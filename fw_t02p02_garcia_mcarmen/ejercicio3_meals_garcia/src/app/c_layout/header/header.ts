import { Component,inject } from '@angular/core';
import { LoginWidget } from '../login-widget/login-widget';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-header',
  imports: [LoginWidget],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    public isAuthenticated = false;
    public authService=inject(AuthService);
    public user:string|undefined="";

  ngOnInit():void{
    if (this.authService.isSession() !== null) {
      this.user=this.authService.isSession()?.name;
      this.isAuthenticated=true;
      //console.log('¡Hay una sesión activa!');
    }
  }
}
