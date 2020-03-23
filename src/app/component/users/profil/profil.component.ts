import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userTokenDecode;
  user: User = null;
  isLoading = false;

  constructor(
    private authentificationservice: AuthentificationService,
    private userService: UsersService,
  ) {
    this.userTokenDecode = jwt_decode(this.authentificationservice.currentUserValue.token);
    console.log('Current User', this.user);
    this.userService.getUserByUsername(this.userTokenDecode.username).subscribe(
      data => {
        while(this.user === null){
          setTimeout(() =>{
            this.isLoading = true;
          }, 1000);
          this.user = data
        }
       // this.user = data;
        console.log('Current User', this.user);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    )

   }

  ngOnInit() {
   /* setTimeout(() =>{
      this.isLoading = true;
    }, 1000);*/
  }

}
