import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {  
  public loginForm!: FormGroup;
  public submitted = false;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authenticationService: AuthenticationService) {
  }

  get f() {
    return this.loginForm.controls;
  }  

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.valid){
      this._authenticationService.signIn({username: this.loginForm.value.username});
    }
  }
  
  async ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      password: ['', Validators.required]
    }); 
  }
}
