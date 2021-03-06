import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';


import { UserService } from './../user/user.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-login-component',
    templateUrl: 'app/login/login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private toastrManager: ToastsManager,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        this.userService.login(this.loginForm.value).then(data => {
            this.authService.login(data.token);
            this.toastrManager.success('Login successful!');
            this.router.navigateByUrl('');
        }).catch(response => {
            if (response.status === 400) {
                this.toastrManager.error('Bad credentials!');
            }
        });
    }
}
