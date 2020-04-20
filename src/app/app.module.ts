import { JwtinterceptorService } from './helpers/jwtinterceptor.service';
import { UsersComponent } from './component/users/users/users.component';
import { AuthentificationService } from './service/authentification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule,    MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatSelectModule,
  MatSortModule, MatPaginatorModule,
  MatTableModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { ListuserComponent } from './component/users/listuser/listuser.component';
import { ComptesComponent } from './component/compte/comptes/comptes.component';
import { ProfilComponent } from './component/users/profil/profil.component';
import { RoutelinkComponent } from './template/routelink/routelink.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginFormComponent } from './component/loginform/loginform.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { DetailuserComponent } from './component/users/detailuser/detailuser.component';
import { ItemuserComponent } from './component/users/itemuser/itemuser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdduserComponent } from './component/users/adduser/adduser.component';
import { EdituserComponent } from './component/users/edituser/edituser.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddcompteComponent } from './component/compte/addcompte/addcompte.component';
import { ListcompteComponent } from './component/compte/listcompte/listcompte.component';
import { ListpartenaireComponent } from './component/compte/listpartenaire/listpartenaire.component';
import { DetailcompteComponent } from './component/compte/detailcompte/detailcompte.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ListuserComponent,
    ComptesComponent,
    ProfilComponent,
    RoutelinkComponent,
    LoginFormComponent,
    HomeComponent,
    UsersComponent,
    DetailuserComponent,
    ItemuserComponent,
    AdduserComponent,
    EdituserComponent,
    AddcompteComponent,
    ListcompteComponent,
    ListpartenaireComponent,
    DetailcompteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({ 
      closeButton: true,
      progressBar: true,
    }),
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
