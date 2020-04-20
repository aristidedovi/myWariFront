import { map } from 'rxjs/operators';
import { UsersService } from './../../../service/users.service';
import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ListuserComponent } from '../listuser/listuser.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  /**
   * @var any[]
   * Tableau des utilisateur
   */
  users: any = [];
  /**
   * @var any[]
   * Tableau des roles
   */
  roles: any = [];
  /**
   * @var User 
   * Pour l'utilisateur selectionner
   */
  selectedUser: User;
  /**
   * @var Boleen 
   * Pour verifier si l'utilisateur est sélectionner
   */
  isSelected = false;
  /**
   * @var Boleen 
   * Pour controler le chargement du spinner
   */
  isLoading;
  /**
   * @var Boleen 
   * Pour controler le chargement du spinner
   */
  isLoadingUser;

  constructor(
    public router: Router,
    private usersService: UsersService,
  ) {

   }

  ngOnInit() {
    this.isSelected = false;
    this.isLoading = true;
    this.loadRole();
  }

  /**
   * Chargement des roles depuis l'API
   */
   loadRole() {
     return this.usersService.getRoles().subscribe((data) => {
       this.roles = data;
       console.log('les roles : ', this.roles);
     })
   }


  /**
   * @params User
   * Envoie de l'utilisateur senectionner depuis la liste users
   */
  selectUser(user) {
    this.selectedUser = user;
    setTimeout(() =>{
      this.isLoading = true;
    }, 1);
    this.isLoading = false;
    this.isSelected = true;
  }

}
