import { UsersComponent } from './../users/users.component';
import { UsersService } from './../../../service/users.service';
import { User } from './../../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/service/authentification.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  /**
   * @Input lié à la variable roles de user.components
   * @var any[]
   */
  @Input() roles: any[];

  /**
   * @Input lié à la variable users de users.components
   * @var any[]
   */
  //@Input() users: any = [];

  /**
   * @Input lié à la variable user de users.components
   * @var User
   */
  @Input() user: User;

  //roless: any = [];
  /**
   * @var Booleen
   * Verifier si le formulaire a été soumit
   */
  isSubmited = false;
  /**
   * @var User
   * L'utilisateur a modifier suit aau click sur modifier
   */
  userUpdate;
  /**
   * @var User
   * Utilisateur qui s'est connecter a traver le token
   */
  currentUser: User;

  /**
   * @Var FromGroup
   * Création du reactive form angular
   */
  userForm = new FormGroup({
    firstname : new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    username: new FormControl(),
    password: new FormControl(),
  });

  /**
   * @var int
   * garder l'id de l'utilisateur à modifier
   */
  id;

  /**
   * @var Booleen
   * Verifier si la modificqtion à été effectuer
   */
  isUpdate = false;

  /**
   * @var Booleen
   * Verifier si le formulaire est chargé
   */
  isLoading = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authentificationService: AuthentificationService,
  ) {
    this.currentUser = jwt_decode(this.authentificationService.currentUserValue.token);
   }

  ngOnInit() {
    setTimeout(() =>{
      this.isLoading = true;
    }, 1000);
    this.route.firstChild.params.subscribe(
      params => {
        this.id = params.userId;
      // console.log(params.userId);
      }
    );

    /*this.userService.getRoles().subscribe(
      data => {
        this.roless = data;
      }
    )*/
   // console.warn('user id', this.id);
   /**
    * Ouvrir le formulaire pour la modification grace à l'id
    */
    if(this.id){
     this.findUserById(this.id);
    }
  }

  /**
   * @Param id
   * Rechercher l'utilisateur grace à son id
   */
  findUserById(id: number) {
    this.isUpdate = true;
    this.userService.findUser(id).subscribe(
      data => {
        this.userUpdate = data;
        this.userForm.setValue({
          firstname: this.userUpdate.firstname,
          lastname: this.userUpdate.lastname,
          email: this.userUpdate.email,
          username: this.userUpdate.username,
          password: '',
          role: this.userUpdate.role,
          telephone: this.userUpdate.telephone
      });
    });
  }

  /**
   * Message de succes
   */
  successmsg() {
    this.toastr.success('Toastr Success message' , 'Success');
  }

  /**
   * Message d'erreur
   */
  errormsg() {
    this.toastr.error('Veuillez saisir tous les champs du formulaire' , 'Erreur');
  }

  /**
   * Fonction de soumission du formulaire
   */
  onSubmit() {
    this.isSubmited = true;
    if (this.userForm.valid){
      if (this.isUpdate) {
        this.updateOldUser();
      } else {
        this.createNewUser();
      }
    } else if (this.userForm.invalid) {
      this.errormsg();
    }
  }

  /**
   * Creation d'un nouveau utilisateur
   */
  createNewUser() {
    const role = '/api/roles/' + this.userForm.value.role.id;
    const user: User = {
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      telephone: this.userForm.value.telephone.toString(),
      email: this.userForm.value.email,
      role: role,
      roles: [this.userForm.value.role.libelle]
    }
    this.userService.addUser(user).subscribe(
      data => {
        this.toastr.success('User ' + user.firstname + ' ' + user.lastname + ' créer', 'Success');
        this.router.navigate(['/users/list']);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    );
  }

  /**
   * Modification d'un ancien utilisateur
   */
  updateOldUser() {
    const role = '/api/roles/' + this.userForm.value.role.id;
    let password = 'null';
    if (this.userForm.value.password != null) {
      password = this.userForm.value.password;
    }
    const user: User = {
      password: password,
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      telephone: this.userForm.value.telephone.toString(),
      email: this.userForm.value.email,
      role: role,
      roles: [this.userForm.value.role.libelle]
    }
    this.userService.updateUser(user, this.id).subscribe(
      data => {
        this.user = data;
        this.toastr.success('User ' + data.username + ' modifier' , 'Success');
        this.router.navigate(['/users/list']);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    );
  }

}
