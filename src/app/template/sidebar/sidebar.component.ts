import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthentificationService } from './../../service/authentification.service';
import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public url1: string = '';
  userTokenDecode;
  currentUser: User;

  constructor(
    private authentificationservice: AuthentificationService,
    private router: Router,
    private location: Location,
    private userService: UsersService,
  ) {
    this.userTokenDecode = jwt_decode(this.authentificationservice.currentUserValue.token);
  }

  ngOnInit() {
    this.userService.getUserByUsername(this.userTokenDecode.username).subscribe(
      data => {
        this.currentUser = data;
       // console.log('Current User', this.currentUser);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    )
    this.url1 = this.location.path();
    console.log(this.url1);
  }

  logout(){
    this.authentificationservice.logout();
    this.router.navigate(['/home']);
  }


}
