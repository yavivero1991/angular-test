import { Component, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  

  constructor(private _authenticationService: AuthenticationService){}

  logOut(){
    this._authenticationService.signOut()
  }
}
