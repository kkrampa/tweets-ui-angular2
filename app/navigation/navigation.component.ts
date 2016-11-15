import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: 'app/navigation/navigation.component.html'
})
export class NavigationComponent {

    constructor(private authService: AuthService, private router: Router) {}

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('login');
    }
}
