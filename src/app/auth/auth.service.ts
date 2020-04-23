import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        });
    }
}
