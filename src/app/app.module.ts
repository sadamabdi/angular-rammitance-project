import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AllusersComponent } from './allusers/allusers.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HttpClientModule } from '@angular/common/http';
import { NewuserComponent } from './newuser/newuser.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationsComponent } from './operations/operations.component';
import { SendmoneyComponent } from './sendmoney/sendmoney.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AllusersComponent,
    HomeComponent,
    ContactusComponent,
    NewuserComponent,
    LoginComponent,
    RegisterComponent,
    OperationsComponent,
    SendmoneyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
