import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllusersComponent } from './allusers/allusers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';
import { RegisterComponent } from './register/register.component';
import { OperationsComponent } from './operations/operations.component';
import { SendmoneyComponent } from './sendmoney/sendmoney.component';
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'allusers', component: AllusersComponent},
  {path: 'newuser', component: NewuserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'operation', component: OperationsComponent},
  {path: 'sendmoney', component: SendmoneyComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
