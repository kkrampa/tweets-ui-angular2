import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


import { AppSettings } from './app-settings';

@Injectable()
export class UserService {
    constructor(private http: Http) {}

    register(user) {
        return this.http.post(`${AppSettings.API_ENDPOINT}/users/register/`, user)
            .toPromise()
            .then(response => response.json());
    }

    checkUsernameAvailability(username: string) {
        return this.http.get(`${AppSettings.API_ENDPOINT}/users/check_username_availability/?username=${username}`)
            .toPromise()
            .then(response => response.json());
    }
}
