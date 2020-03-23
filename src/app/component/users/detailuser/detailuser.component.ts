import { UsersService } from './../../../service/users.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import * as jwt_decode from 'jwt-decode';
import { ListuserComponent } from '../listuser/listuser.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  @Input() user: User;
  @Input() detail;
  @Input() isSelected;
  currentUser: User;
  isSuperAdmin = false;
  loading = false;
  listUser: ListuserComponent;

  constructor(
    private userService: UsersService,
    private router: Router,
    private authificationService: AuthentificationService,
    private toastr: ToastrService,
   ) {
    this.currentUser = jwt_decode(this.authificationService.currentUserValue.token);
    //this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';

   }


  ngOnInit() {

  }

  onDelete(user){
    const link = ['/users'];
    this.userService.deleteUser(user.id).subscribe(
      data => {
        console.log('Supression', data);
        this.toastr.success('User ' + user.username + ' à été supprimer', 'Success');
        this.router.navigate(link);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    )
  }

  onDesactived(user){
    const link = ['/users'];
    user.isActive = !user.isActive;
    console.log(user);
    this.userService.updateUser(user, user.id).subscribe(
      data => {
        //console.log('bloquer', data);
        this.toastr.success('User ' + user.username + ' à été désactivé', 'Success');
        this.router.navigate(link);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    )
  }




}
