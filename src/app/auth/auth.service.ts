import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';

export interface AuthresponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<UserModel>(null);
    token: string = null;

    constructor(private http: HttpClient, private router: Router) { }

    private handleAuthentication(email: string, userID: string, token: string, expdate: number) {
        const expDate = new Date(new Date().getTime() + expdate * 1000);
        const user = new UserModel(email, userID, token, expDate);
        this.user.next(user);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    signup(email: string, password: string) {
        return this.http.post<AuthresponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmS1QIGQIVo2TkwZTyO9FWQuSbLmGbbDw'
            , {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),
                tap(
                    resData => {
                        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    }

                )
            );
    }


    autoLogin() {
        const userData: {
            email:string,
            id: string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse( localStorage.getItem('userData') );
        if(!userData) {
            return;
        }

        const loadeduser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if ( loadeduser.Token ) {
            this.user.next(loadeduser);
        }
    }

    login(login: string, password: string) {
        return this.http.post<AuthresponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyDmS1QIGQIVo2TkwZTyO9FWQuSbLmGbbDw',
            {
                email: login,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),
                tap(
                    resData => {
                        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    }

                ));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleError(errorRES: HttpErrorResponse) {
        let errorMessage = 'An unkown error random!';
        if (!errorRES.error || !errorRES.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRES.error.error.message) {
            case 'EMAIL_EXISTS': errorMessage = 'This EMAIL already exist'; break;
            case 'EMAIL_NOT_FOUND': errorMessage = 'This is EMAIL is not found in database'; break;
            case 'INVALID_PASSWORD': errorMessage = 'This is invalid password'; break;
            case 'USER_DISABLED': errorMessage = 'This user is disabled in database'; break;

        }
        return throwError(errorMessage);
    }
}
