import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 
  constructor(public router: Router) {
  }

  public get currentUserData(): User {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    return user !== null && user.username;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  setLocalStorage(user: User | null = null) {
    if(user == null){
      this.signOut();
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  signIn(user: User) {
    this.setLocalStorage(user);
    this.router.navigate(['/home'])
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
