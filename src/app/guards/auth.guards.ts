import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ItemsService } from '../services/items.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  
  constructor(private _router: Router, private _authenticationService: AuthenticationService, private _itemsServices: ItemsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserData;
    
    if (currentUser && currentUser?.username !== undefined) {
      if(state.url == '/item' && this._itemsServices.getItemSubject().getValue() === undefined){
        this._router.navigate(['/items']);
        return false;
      }
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
}
