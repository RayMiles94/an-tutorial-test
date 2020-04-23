import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';

// service 
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm)  {
    if (!f.valid) {
      return;
    }
    const email = f.value.email;
    const password = f.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      // ...
    }
    else {
      this.authService.signup(email, password).subscribe(
        res => {
          console.log(res);
          this.isLoading = false;
        }, errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
    f.reset();
    
  }

}
