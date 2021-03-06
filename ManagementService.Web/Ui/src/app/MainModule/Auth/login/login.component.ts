import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/Services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup=new FormGroup({
    'Username':new FormControl('administrator',[Validators.required]),
    'Password':new FormControl('PPpp@123456',[Validators.required]),
    'RememberMe' : new FormControl(true,)
  });

  error = "";
  returnUrl = "";
  constructor(private authService:AuthService, private router: Router,
              private route: ActivatedRoute) {
    // reset the login status
    //this.authService.logout(false);

    // get the return url from route parameters
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"];
  }

  ngOnInit() {

  }

  Login():void{
    //return;
    if(this.form.valid) {
      this.error = "";
      this.authService.login(this.form.value)
        .subscribe(isLoggedIn => {
            if (isLoggedIn) {
              if (this.returnUrl) {
                this.router.navigate([this.returnUrl]);
              } else {
                this.router.navigate([""]);
              }
            }
          },
          (error: HttpErrorResponse) => {
            console.error("Login error", error);
            if (error.status === 401) {
              this.error = "Invalid User name or Password. Please try again.";
            } else {
              this.error = `${error.statusText}: ${error.message}`;
            }
          });
    }
  }


}
