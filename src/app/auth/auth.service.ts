import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthresponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmS1QIGQIVo2TkwZTyO9FWQuSbLmGbbDw'
            , {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError));
    }

    login(login: string, password: string) {
        return this.http.post<AuthresponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyDmS1QIGQIVo2TkwZTyO9FWQuSbLmGbbDw',
            {
                email: login,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError));
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
