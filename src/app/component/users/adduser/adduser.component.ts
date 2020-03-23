import { UsersComponent } from './../users/users.component';
import { UsersService } from './../../../service/users.service';
import { User } from './../../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @Input() roles: any[];
  @Input() users: any = [];
  isSubmited = false;
  userUpdate; 
 

  userForm = new FormGroup({
    firstname : new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    username: new FormControl(),
    password: new FormControl(),
  });
  id;
  isUpdate = false;
  isLoading = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {

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
   // console.warn('user id', this.id);
    if(this.id){
      this.isUpdate = true;
      this.userService.findUser(this.id).subscribe(
        data => {
          this.userUpdate = data;
          console.warn('find user',this.userUpdate);
          this.userForm.setValue({
            firstname: this.userUpdate.firstname,
            lastname: this.userUpdate.lastname,
            email: this.userUpdate.email,
            username: this.userUpdate.username,
            password: '',
            role: this.userUpdate.role,
            telephone: this.userUpdate.telephone
        });
          console.log('Formulaire', this.userForm.controls['role'].value.libelle);
        });
      //console.log('User update', this.userUpdate);[]
    }
  }

  successmsg(){
    this.toastr.success("Toastr Success message",'Success')  
  }
  errormsg(){
    this.toastr.error('Veuillez saisir tous les champs du formulaire','Erreur')  
  }

  onSubmit(){
    this.isSubmited = true
    if(this.userForm.valid){
      if (this.isUpdate) {
        console.log('Id role', this.userForm.value.role);
        const role = '/api/roles/' + this.userForm.value.role.id;
        const user: User = {
          username: this.userForm.value.username,
          firstname: this.userForm.value.firstname,
          lastname: this.userForm.value.lastname,
          telephone: this.userForm.value.telephone.toString(),
          email: this.userForm.value.email,
          role: role,
          roles: [this.userForm.value.role.libelle]
        }
        this.userService.updateUser(user, this.id).subscribe(
          data => {
            console.warn(data);
            this.toastr.success('User '+user.username+' modifier','Success');
            this.router.navigate(['/users/list']);
            //this.userComponent.ngOnInit();
          },
          error => {
            console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
          }
        );
        //console.log('Modification ', this.userForm);
      } else {
      console.log('Id role', this.userForm.value.role);
      const role = '/api/roles/' + this.userForm.value.role.id;
      const user: User = {
        username: 'username',
        password: 'password',
        firstname: this.userForm.value.firstname,
        lastname: this.userForm.value.lastname,
        telephone: this.userForm.value.telephone.toString(),
        email: this.userForm.value.email,
        role: role,
        roles: [this.userForm.value.role.libelle]
      }
      //console.log(user);
      this.userService.addUser(user).subscribe(
        data => {
          console.warn(data);
          this.toastr.success('User ' + user.firstname + ' ' + user.lastname + ' créer', 'Success');
          this.router.navigate(['/users/list']);
        },
        error => {
          console.warn('Erreur lors de la connexion verifier votre connexion et réssayer');
        }
      );
      //console.log('Ajout ', this.userForm);
      }
    }else if(this.userForm.invalid){
      this.errormsg();
    }
  }

}
