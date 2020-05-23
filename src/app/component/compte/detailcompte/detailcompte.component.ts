import { Component, OnInit, Input } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ComptesService } from "./../../../service/comptes.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-detailcompte",
  templateUrl: "./detailcompte.component.html",
  styleUrls: ["./detailcompte.component.css"],
})
export class DetailcompteComponent implements OnInit {
  @Input() compte: any;
  isSelected = false;

  constructor(
    private compteService: ComptesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.compte != null) {
      this.isSelected = true;
    }
  }

  onDelete(compte) {
    console.log(compte);
    const link = ["/partenaires/list"];
    this.compteService.deleteCompte(compte.id).subscribe((data) => {
      //this.partenairelist.splice(i, 1);
      this.toastr.success(
        "Compte N°" + compte.numero + " supprimer",
        "Success"
      );
      this.router.navigate(link);
    });
  }
}
