import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {
    constructor(private http: Http, @Inject('API_URL') private apiUrl: string) {}
    login(credentials) {
        return this.http.post(`${this.apiUrl}/api-token-auth/`, credentials)
            .toPromise()
            .then(response => response.json());
    }

    register(user) {
        return this.http.post(`${this.apiUrl}/users/register/`, user)
            .toPromise()
            .then(response => response.json());
    }

    checkUsernameAvailability(username: string) {
        return this.http.get(`${this.apiUrl}/users/check_username_availability/?username=${username}`)
            .toPromise()
            .then(response => response.json());
    }
}
