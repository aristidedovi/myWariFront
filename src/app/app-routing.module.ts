import { ListpartenaireComponent } from "./component/compte/listpartenaire/listpartenaire.component";
import { AddcompteComponent } from "./component/compte/addcompte/addcompte.component";
import { ListcompteComponent } from "./component/compte/listcompte/listcompte.component";
import { ComptesComponent } from "./component/compte/comptes/comptes.component";
import { UserGuard } from "./helpers/user.guard";
import { ProfilComponent } from "./component/users/profil/profil.component";
import { EdituserComponent } from "./component/users/edituser/edituser.component";
import { AdduserComponent } from "./component/users/adduser/adduser.component";
import { DetailuserComponent } from "./component/users/detailuser/detailuser.component";
import { UsersComponent } from "./component/users/users/users.component";
import { ListuserComponent } from "./component/users/listuser/listuser.component";
import { AuthGuard } from "./helpers/auth.guard";
import { HomeComponent } from "./component/home/home.component";
import { LoginFormComponent } from "./component/loginform/loginform.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivateChild } from "@angular/router";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginFormComponent },
  { path: "profil", component: ProfilComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: "list", component: ListuserComponent },
      { path: "list/detail/delete", component: UsersComponent },
      { path: "list/detail", component: DetailuserComponent },
      { path: "list/edit/:userId", component: AdduserComponent },
      { path: "list/add", component: AdduserComponent },
    ],
    canActivate: [UserGuard],
  },
  {
    path: "partenaires",
    component: ComptesComponent,
    children: [
      { path: "list", component: ListcompteComponent },
      { path: "list/comptes/:ninea", component: ComptesComponent },
      { path: "list/comptes/detail", component: ComptesComponent },
      { path: "list/edit/:userId", component: AddcompteComponent },
      { path: "list/add", component: AddcompteComponent },
      { path: "list/comptes/detail/user", component: ComptesComponent },
    ],
    canActivate: [UserGuard],
  },

  //otherwise redirect to home
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
