import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/debounceTime';

import { UserRegister } from './user-register';
import { UserService } from './user.service';

@Component({
    selector: 'app-register-component',
    templateUrl: 'app/register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private toastrManager: ToastsManager
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.registerForm = this.fb.group({
            username: [this.model.username, [
                Validators.required
            ], this.usernameValidatorAsync.bind(this)],
            email: [this.model.email, [
                Validators.required, RegisterComponent.emailValidator
            ]],
            firstName: [this.model.firstName, []],
            lastName: [this.model.lastName, []],
            passwords: this.fb.group({
                password: [this.model.password, [
                    Validators.required
                ]],
                repeatPassword: [this.model.repeatPassword, [
                    Validators.required
                ]]
            }, {validator: RegisterComponent.arePasswordsEqual})
        });
        for (let key in this.registerForm.controls) {
            const control = this.registerForm.get(key);
            if (control.asyncValidator) {
                control.valueChanges
                    .debounceTime(250)
                    .subscribe(newValue => this.onValueChanged({}))
            } else {
                control.valueChanges.subscribe(newValue => this.onValueChanged({}));
            }

        }
        this.onValueChanged();
    }

    static arePasswordsEqual(group) {
        const password = group.controls.password;
        const repeatPassword = group.controls.repeatPassword;

        if ((!password.dirty || !repeatPassword.dirty) || password.value === repeatPassword.value) {
            return null;
        }

        return {
            areEqual: true
        };
    }

    static emailValidator(control: FormControl) {
        // RFC 2822 compliant regex
        if (!control.value || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return {invalidEmailAddress: true};
        }
    }

    usernameValidatorAsync(control: FormControl) {
        return new Promise(resolve => {
            this.userService.checkUsernameAvailability(control.value).then(data => {
                if (data.available) {
                    resolve(null);
                } else {
                    resolve({alreadyTaken: true});
                    this.onValueChanged({});
                }
            });
        });
    }

    handleNested = function(controls) {
        for (const field in this.formErrors) {
            const control = controls[field];
            if (!control) {
                continue;
            }
            if (control && control.controls) {
                this.handleNested(control.controls);
            }
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    if (!control.errors.hasOwnProperty(key) || key.startsWith('__')) {
                        continue;
                    }
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }

    };

    onValueChanged(data?: any) {
        if (!this.registerForm) { return; }
        const form = this.registerForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control instanceof FormGroup) {
                this.handleNested((<FormGroup>control).controls);
            }
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    if (!control.errors.hasOwnProperty(key) || key.startsWith('__')) {
                        continue;
                    }
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    model = new UserRegister('', '', '', '', '', '');

    onSubmit() {
        const user = this.registerForm.value;
        user.password = user.passwords.password;
        user.repeat_password = user.passwords.repeatPassword;
        user.passwords = null;

        var vm = this;
        this.userService.register(user).then(function() {
            vm.toastrManager.success("Your account was created successfully. Now you can login.");
            vm.router.navigateByUrl('');
        }).catch(function(response) {
            // TODO
        });
    }

    formErrors = {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        passwords: ''
    };

    validationMessages = {
        username: {
            required: 'Username is required',
            alreadyTaken: 'This username has been already taken'
        },
        email: {
            required: 'Email is required',
            invalidEmailAddress: 'Invalid email address'
        },
        passwords: {
            areEqual: "Passwords aren't equal"
        },
        password: {
            required: 'Password is required'
        },
        repeatPassword: {
            required: 'Please confirm password'
        }
    }
}
