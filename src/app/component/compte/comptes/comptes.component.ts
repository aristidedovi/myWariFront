import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  isSelected;
  selectedUser;
  isLoading;

  comptes: any[];

  selectedOnePartenaire: any;
  isSelectedPartenaire = false;
  selectedOneCompte: any;
  isSelectedCompte = false;
  roles: any = [];


  constructor(
    public router: Router,
    public userService: UsersService,
  ) { }

  ngOnInit() {
    this.isSelectedPartenaire = false;
    this.loadRolePartenaire();
  }

  loadRolePartenaire(){
    return this.userService.getRoles().subscribe((data) => {
      this.roles = data;
    })
  }

  selectPartenaire(partenaire){
    console.log('Partenaire select ', partenaire);
    this.selectedOnePartenaire = partenaire;
    this.isSelectedPartenaire = true;
  }

  selectCompte(compte){
    console.log('Partenaire select ', compte);
    this.selectedOneCompte = compte;
    this.isSelectedCompte = true;
  }

}
