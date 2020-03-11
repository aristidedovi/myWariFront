import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  selectedUser: User;
  isSelected;

  constructor() { }

  ngOnInit() {
    this.isSelected = false;
    const user1 = new User();
    const user2 = new User();
    const user3 = new User();
    const user4 = new User();
    const user5 = new User();
    const user6 = new User();
    const user7 = new User();
    const user8 = new User();
    const user9 = new User();
    const user10 = new User();

    user1.username = 'afi';
    user1.password = 'afi';
    user1.token = 'token';

    user2.username = 'awa';
    user2.password = 'awa';
    user2.token = 'token';

    user3.username = 'awa';
    user3.password = 'awa';
    user3.token = 'token';

    user4.username = 'koffi';
    user4.password = 'koffi';
    user4.token = 'token';


    user5.username = 'koffi';
    user5.password = 'koffi';
    user5.token = 'token';


    user6.username = 'koffi';
    user6.password = 'koffi';
    user6.token = 'token';


    user7.username = 'koffi';
    user7.password = 'koffi';
    user7.token = 'token';


    user8.username = 'koffi';
    user8.password = 'koffi';
    user8.token = 'token';


    user9.username = 'koffi';
    user9.password = 'koffi';
    user9.token = 'token';


    user10.username = 'koffi';
    user10.password = 'koffi';
    user10.token = 'token';

    this.users = [
      user1, user2, user3, user4, user5, user6, user7, user8, user9, user10
    ];
  }

  selectUser(user) {
    this.selectedUser = user;
    this.isSelected = true;
    console.log("select user :", this.selectedUser);
  }

}
