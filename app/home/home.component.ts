import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home-component',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent {

    public content: string;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    logout(): void {
        this.authService.logout();
        this.router.navigateByUrl('login');
    }
}
