import { map } from 'rxjs/operators';
import { UsersService } from './../../../service/users.service';
import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ListuserComponent } from '../listuser/listuser.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  roles: any = [];
  selectedUser: User;
  isSelected = false;
  isLoading;
  isLoadingUser;

  //@ViewChild(ListuserComponent, {static: false}) list: ListuserComponent;

  constructor(
    public router: Router,
    private usersService: UsersService,
  ) {

   }


  /* loadChild(){
     setTimeout(
       () => this.list.ngOnInit(),0
     )
   }*/

  ngOnInit() {
    this.isSelected = false;
    this.isLoading = true;
    setTimeout(() =>{
      this.isLoadingUser = true;
    }, 1000);
    

    this.loadUser();
    //this.loadChild()
    this.loadRole();
  }

  loadUser(){
    // const users: User = [];
     return this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      console.log("Initialisation",this.users);
     });
   }

   loadRole(){
     return this.usersService.getRoles().subscribe((data) => {
       this.roles = data;
       console.log('les roles : ', this.roles);
     })
   }

  selectUser(user) {
    this.selectedUser = user;
    setTimeout(() =>{
      this.isLoading = true;
    }, 1000);
    this.isLoading = false;
    this.isSelected = true;
    console.log('select user :', this.selectedUser);
  }

}
