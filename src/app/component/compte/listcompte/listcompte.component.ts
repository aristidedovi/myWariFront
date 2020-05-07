import { Compte } from "./../../../models/compte";
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { UsersService } from "src/app/service/users.service";
import { ComptesService } from "src/app/service/comptes.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-listcompte",
  templateUrl: "./listcompte.component.html",
  styleUrls: ["./listcompte.component.css"],
})
export class ListcompteComponent implements OnInit {
  comptelist: any = [];
  searchText;
  loading = true;
  @Input() partenaire: any;
  isSelectedPartenaire = false;
  selectedCompte: any;
  selectedUser: any;
  @Output() selectedOneCompte = new EventEmitter();
  @Output() selectedOneUser = new EventEmitter();
  constructor(private compteservice: ComptesService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("Partenaire", this.partenaire);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.comptelist = this.partenaire.comptes;
  }

  ngOnInit() {
    if (this.partenaire != null) {
      this.isSelectedPartenaire = true;
    }
  }

  onRowClicked(row) {
    console.log("compte row", row);
    this.selectedCompte = row;
    this.selectedOneCompte.emit(row);
    this.router.navigate(["/partenaires/list/comptes/detail"]);
  }

  onRowClickedUser(row) {
    console.log("user row", row);
    this.selectedUser = row;
    this.selectedOneUser.emit(row);
    this.router.navigate(["/partenaires/list/comptes/detail/user"]);
  }
}
