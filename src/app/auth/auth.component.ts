import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// service 
import { AuthService, AuthresponseData } from './auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

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

    let authObs: Observable<AuthresponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    f.reset();
    
  }

}
