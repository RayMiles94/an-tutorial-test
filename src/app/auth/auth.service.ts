import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthresponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http:HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthresponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmS1QIGQIVo2TkwZTyO9FWQuSbLmGbbDw'
        , {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(
            error => {
                let errorMessage = 'An unkown error random!';
                if (!error.error || !error.error.error ) {
                   return throwError(errorMessage);
                }
                switch (error.error.error.message) {
                    case 'EMAIL_EXISTS': errorMessage = 'This EMAIL already exist'
                }
                return throwError(errorMessage);
            }
        ));
    }
}
