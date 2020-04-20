import { UsersService } from 'src/app/service/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  /**
   * @var User
   * @Input user pour recevoir le user selectionner dans la listuser.component
   */
  @Input() user: User;

  //@Input() detail;
  //@Input() isSelected;
  /**
   * @var Booleen
   * Verifier si l'utilisateur es sectionner
   */
  isSelected = false;

  /**
   * @var User
   * Utilisateur connecter
   */
  currentUser: User;
  /**
   * @var Booleen
   * Verifier si c'est un superadmin
   */
  isSuperAdmin = false;

  /**
   * @var Booleen
   * Verifier si le spinne se charge
   */
  loading = false;

  /**
   * @var Booleen
   */
  isDisabled = false;


  //@ViewChild(ListuserComponent, {static: false}) userComponent: ListuserComponent;

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
    if(this.user != null){
        setTimeout(() =>{
          this.loading = true;
        }, 1000);
        this.isSelected = true;

    }
  }

  onDelete(user){
    const link = ['/users/list/detail/delete'];
    this.userService.deleteUser(user.id).subscribe(
      data => {
        console.log('Supression', data);
        this.toastr.success('User ' + user.username + ' à été supprimer', 'Success');
        this.isSelected = false;
        this.router.navigate(link);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    )
  }

  onDesactived(user){
    this.isDisabled = true;
    this.isSelected = false;
    const link = ['/users/list'];
    let info;
   // user.isActive = !user.isActive;
    if (user.isActive === true) {
      info = 'bloqué';
      user.isActive = false;
    } else {
      info = 'débloqué';
      user.isActive = true;
    }
    this.userService.updateUser(user, user.id).subscribe(
      data => {
        this.toastr.success('User ' + data.username + ' à été ' + info + ' avec success');
        this.user = data;
        this.router.navigate(link);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    )
  }
}
