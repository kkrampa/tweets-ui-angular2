import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AUTH_PROVIDERS } from 'angular2-jwt';


import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { DebounceDirective } from './debounce.directive';

import { UserService } from './user.service';
import {HomeComponent} from './home.component';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';

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
  declarations: [ AppComponent, HomeComponent, LoginComponent, RegisterComponent, DebounceDirective ],
  bootstrap:    [ AppComponent ],   
  providers: [UserService, AuthService, AuthGuardService, AUTH_PROVIDERS]
})
export class AppModule { }
