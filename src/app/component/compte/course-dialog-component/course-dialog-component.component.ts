import { ToastrService } from "ngx-toastr";
import { ComptesService } from "./../../../service/comptes.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-course-dialog-component",
  templateUrl: "./course-dialog-component.component.html",
  styleUrls: ["./course-dialog-component.component.css"],
})
export class CourseDialogComponentComponent implements OnInit {
  form: FormGroup;
  description: string;
  ninea: number;
  compte: any;
  id: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponentComponent>,
    private compteService: ComptesService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    //console.log("data description ", data);
    this.description = data.title;
    this.ninea = data.ninea;
    this.id = data.id;
  }

  ngOnInit() {
    /*this.form = this.fb.group({
      montant: ["", []],
    });*/
    this.form = new FormGroup({
      partenaire: new FormGroup({
        ninea: new FormControl(this.ninea, Validators.required),
      }),
      depots: new FormGroup({
        mntDeposser: new FormControl("", Validators.required),
      }),
    });
  }

  save() {
    const link = ["/partenaires/list/"];
    this.compteService.createCompte(this.form.value).subscribe(
      (data) => {
        //console.log('compte response', data);
        this.compte = data;
        this.toastr.success("Compte créer avec", "Success");
        this.router.navigate(link);
      },
      (error) => {
        console.warn(
          "Erreur lors de la connexion verifier votre connexion et réssayer"
        );
      }
    );
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
