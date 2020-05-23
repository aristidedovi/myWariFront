import { Component, OnInit, SimpleChanges } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/service/users.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CourseDialogComponentComponent } from "../course-dialog-component/course-dialog-component.component";

@Component({
  selector: "app-comptes",
  templateUrl: "./comptes.component.html",
  styleUrls: ["./comptes.component.css"],
})
export class ComptesComponent implements OnInit {
  isSelected;
  selectedUser;
  isLoading;

  comptes: any[];

  selectedOnePartenaire: any;
  isSelectedPartenaire = false;
  selectedOneCompte: any;
  selectedOneUser: any;
  isSelectedCompte = false;
  isSelectedUser = false;
  roles: any = [];

  constructor(
    public router: Router,
    public userService: UsersService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSelectedPartenaire = false;
    this.loadRolePartenaire();
  }

  isCompteList() {
    let ninea = this.route.firstChild.snapshot.paramMap.get("ninea");
    return this.router.url === "/partenaires/list/comptes/" + ninea;
  }

  openDialog(ninea) {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = {
      id: this.selectedOnePartenaire.id,
      title: "Nouveau compte pour le partenaire " + ninea,
      ninea: ninea,
    };

    this.dialog.open(CourseDialogComponentComponent, dialogConfig);
  }

  loadRolePartenaire() {
    return this.userService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  selectPartenaire(partenaire) {
    console.log("Partenaire select ", partenaire);
    this.selectedOnePartenaire = partenaire;
    this.isSelectedPartenaire = true;
  }

  selectCompte(compte) {
    console.log("Partenaire select ", compte);
    this.selectedOneCompte = compte;
    this.isSelectedCompte = true;
  }

  selectUser(user) {
    console.log("user detail ", user);
    this.selectedOneUser = user;
    this.isSelectedUser = true;
  }
}
