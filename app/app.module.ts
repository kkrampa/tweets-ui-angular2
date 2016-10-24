import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';


import { AppComponent }   from './app.component';
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

import { UserService } from './user.service';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      ReactiveFormsModule,
      ToastModule,
      RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'register', component: RegisterComponent }
      ])
  ],
  declarations: [ AppComponent, LoginComponent, RegisterComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UserService]
})
export class AppModule { }
