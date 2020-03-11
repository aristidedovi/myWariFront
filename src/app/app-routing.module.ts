import { UsersComponent } from './component/users/users/users.component';
import { ListuserComponent } from './component/users/listuser/listuser.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LoginFormComponent } from './component/loginform/loginform.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginFormComponent},
  {path: 'users', component: UsersComponent},

  //otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
