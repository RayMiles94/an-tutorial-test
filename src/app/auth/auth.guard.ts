// injectable services inside service 
import { Injectable } from '@angular/core';

// angular router core libaries 
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

// Observable
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

// auth service
import { AuthService } from './auth.service';


@Injectable({ providedIn:'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |  Promise<boolean | UrlTree> | Observable<boolean | UrlTree>  {
        return this.authService.user.pipe(
            take(1),
            map(
             user => {
                 const isAuth =  !!user;
                 if (isAuth) {
                     return true;
                 }
                 // ref:#45
                 return this.router.createUrlTree(['/auth']);
             }
            )/*
             its work fine but  i have better solution using url TREE ref:#45
            ,
            tap(
                isAuth => {
                    if (!isAuth) {
                        this.router.navigate(['/auth']);
                    }
                }
            ) */
        );
    }

}