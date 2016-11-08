import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    loggedIn(): boolean {
        return tokenNotExpired();
    }

    login(token): void {
        localStorage.setItem('id_token', token);
    }

    logout(): void {
        localStorage.removeItem('id_token');
    }
}
