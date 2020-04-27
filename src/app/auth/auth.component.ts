import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// service 
import { AuthService, AuthresponseData } from './auth.service';
import { Observable } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlacerHolderDirective } from '../shared/placerholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlacerHolderDirective)
  alertHost: PlacerHolderDirective;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    f.reset();
    
  }

  OnHandleError() {
    this.error =null;
  }

  private showErrorAlert(errorMessage: string) {
    const alertComfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostviewContainerRef = this.alertHost.viewContainerRef;
    hostviewContainerRef.clear();
    hostviewContainerRef.createComponent(alertComfactory);
  }

}
