import { ComptesService } from 'src/app/service/comptes.service';
import { User } from './../../../models/user';
import { AuthentificationService } from './../../../service/authentification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-addcompte',
  templateUrl: './addcompte.component.html',
  styleUrls: ['./addcompte.component.css']
})
export class AddcompteComponent implements OnInit {

  isLoading = false;

  /**
   * @var Booleen
   * Verifier si la modificqtion à été effectuer
   */
  isUpdate = false;

  isSubmited = false;

  /**
   * @var User
   * L'utilisateur a modifier suit aau click sur modifier
   */
  userUpdate;

  /**
   * @Input lié à la variable roles de user.components
   * @var any[]
   */
  @Input() roles: any[];

  /**
   * @var User
   * Utilisateur qui s'est connecter a traver le token
   */
  currentUser: User;

  compte: any;

  compteForm = new FormGroup({
    partenaire: new FormGroup({
      ninea: new FormControl('', Validators.required),
      rc: new FormControl('', Validators.required),
      user: new FormGroup({
        firstname : new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        telephone: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        username: new FormControl(),
        password: new FormControl(),
      }),
    }),
    depots: new FormGroup({
      mntDeposser: new FormControl('', Validators.required),
    })
  });


  constructor(
    private compteService: ComptesService,
    private authentificationService: AuthentificationService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.currentUser = jwt_decode(this.authentificationService.currentUserValue.token);
   }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = true;
    }, 1000);
  }

  onSubmit(){
    //this.toastr.success('Compte N°  créer', 'Success');
    const link = ['/partenaires/list'];
    //this.router.navigate(link);
   
    this.compteService.createCompte(this.compteForm.value).subscribe(
      data => {
        console.log('compte response', data);
        this.compte = data;
        this.toastr.success('Compte N° ' + this.compte.numero + ' créer', 'Success');
        this.router.navigate(link);
      },
      error => {
        console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
      }
    );
    console.log(this.compteForm.value);
  }


}
