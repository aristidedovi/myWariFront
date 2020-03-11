import { AuthentificationService } from './service/authentification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;

  constructor(
    private authentificationservice: AuthentificationService,
  ){
    this.authentificationservice.currentUser.subscribe( x => this.currentUser = x);
    console.warn(this.currentUser);
  }
}
