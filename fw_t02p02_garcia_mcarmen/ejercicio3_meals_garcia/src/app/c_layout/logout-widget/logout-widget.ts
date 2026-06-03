import { Component,Input, Output,EventEmitter, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-logout-widget',
  imports: [],
  templateUrl: './logout-widget.html',
  styleUrl: './logout-widget.css',
})
export class LogoutWidget {

    @Input() public user:string|undefined='';

    @Output() cerrarSesionEvent=new EventEmitter<boolean>();
    private authService=inject(AuthService);

    public cerrarSesion(){
        this.authService.logout();
        this.cerrarSesionEvent.emit(false);
    }

}
