import { Router } from '@angular/router';
import { AuthentificationService } from './../../service/authentification.service';
import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public url1: string = '';

  constructor(
    private authentificationservice: AuthentificationService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.url1 = this.location.path();
    console.log(this.url1);
  }

  logout(){
    this.authentificationservice.logout();
    this.router.navigate(['/home']);
  }


}
