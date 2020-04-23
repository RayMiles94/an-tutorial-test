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

    if (this.isLoginMode) {
      // ...
    }
    else {
      this.authService.signup(email, password).subscribe(
        res => {
          console.log(res);
        }, error => {
          console.log(error);
        }
      );
    }
    f.reset();
    
  }

}
