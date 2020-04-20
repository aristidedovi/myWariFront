import { Component, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { ComptesService } from 'src/app/service/comptes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listpartenaire',
  templateUrl: './listpartenaire.component.html',
  styleUrls: ['./listpartenaire.component.css']
})
export class ListpartenaireComponent implements OnInit {

  partenairelist: any = [];
  searchText;
  loading = true;
  selectedPartenaire: any;
  @Output() selectedOnePartenaire = new EventEmitter();
  constructor(
    private compteservice: ComptesService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.compteservice.getPartenaires().subscribe((data) => {
      this.partenairelist = data;
    });
  }

  
  onRowClicked(row){
    console.log('Partenaire row', row);
    this.selectedPartenaire = row;
    this.selectedOnePartenaire.emit(
      row
    );
    this.router.navigate(['/partenaires/list/comptes']);
  }

  deletePartenaire(partenaire, i: number) {

    console.log(partenaire);
    const link = ['/partenaires/list'];

    this.compteservice.deletePartenaire(partenaire.id).subscribe((data) => {
      this.partenairelist.splice(i, 1);
      this.toastr.success('Partenaire avec le ninea ' + partenaire.ninea + ' supprimer', 'Success');
      this.router.navigate(link);

    });
  }

  activateOrDesactivate(partenaire,i: number){
    const link = ['/partenaires/list'];
    let info;
    if (partenaire.isActive === true) {
      info = 'bloqué';
      partenaire.isActive = false;
    } else {
      info = 'débloqué';
      partenaire.isActive = true;
    }
    this.compteservice.updatePartenaire({'isActive': partenaire.isActive}, partenaire.id).subscribe(
      (data) => {
      this.toastr.success('Partenaire ' + partenaire.ninea + ' à été ' + info + ' avec success');
      this.partenairelist[i] = partenaire;
      console.log(partenaire);
      //this.user = data;
      this.router.navigate(link);
    });
  }
}
