import { User } from './../../models/user';
import { AuthentificationService } from './../../service/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  logged: boolean = false;
  loading = false;
  errorMessage;

  constructor(
    private authentifiaction: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router,
    )
     {
        if(this.authentifiaction.currentUserValue){
          this.router.navigate(['/']);
        }

      }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
  }

  onSubmit(){


    this.loading = true;

    const user: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    const link = ['/home'];
    this.authentifiaction.login(user).subscribe(
      data => {

        console.warn(data);
        this.logged = true;
        this.router.navigate(link);
      },
      error => {
        setTimeout(() =>{
          this.loading = false;
        }, 1000);
        this.errorMessage = error;
        //console.warn(error);
      });
  }
}
