import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { provideAuth } from 'angular2-jwt';



import { AppComponent }   from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { DebounceDirective } from './debounce.directive';

import { UserService } from './user/user.service';
import {HomeComponent} from './home/home.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {API_URL} from './app-settings';
import {TweetService} from './tweet/tweet.service';
import {TweetListComponent} from './tweet/tweet-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        ToastModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, canActivate: [AuthGuardService]},
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ])
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TweetListComponent,
        DebounceDirective
    ],
    bootstrap:    [ AppComponent ],
    providers: [
        UserService,
        AuthService,
        TweetService,
        AuthGuardService,
        provideAuth({
            headerPrefix: 'JWT'
        }),
        {provide: 'API_URL', useValue: API_URL}
    ]
})
export class AppModule { }
