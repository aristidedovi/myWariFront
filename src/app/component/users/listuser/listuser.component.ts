import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  /**
   * @var USer[]
   * variable lié à users dans users.component
   */
  @Input() users: User[];

  /**
   * @var any[]
   * Liste des utilisateurs de la base de données
   */
  userslist: any = [];

  //@Input() user: User;
  /**
   * @var User
   * Mettre en évidence l'utilisateur selectionner
   */
  selectedUsers: User;

  //dataSource = new MatTableDataSource();
  //usersData: any = [];

  /**
   * @var booleen
   * Chargement spinner de la liste
   */
  loading = true;
  /**
   * @var any
   * Variable de recherche
   */
  searchText;
  /**
   * @var EventEmitter
   * @Output pour envoyer l'utilisateur selectionner au user.component et au detail.component
   */
  @Output() selectedUser = new EventEmitter();
  //displayedColumns: string[] = ['position', 'weight', 'detail'];
  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private router: Router,
    private userService: UsersService,
  ) {


  }


  /**
   * @Params User
   * Emmission de l'utilisateur selectionner au users.component et au detal.component
   */
  onRowClicked(row) {
    // console.log('row ',row)
     this.selectedUsers = row;
     this.selectedUser.emit(
       row
     );
     this.router.navigate(['/users/list/detail/']);
   }

  ngOnInit() {
    this.selectedUser.emit(null);
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.userService.getUsers().subscribe((data) => {
      this.userslist  = data;
     });

   // console.log("Initialisation",this.users);
   // this.dataSource.data = this.users;
   // this.dataSource.paginator = this.paginator;
   // this.displayedColumns = ['position', 'name'];
   /* this.dataSource = new MatTableDataSource([]);
    this.userService.getUsers().subscribe((data) => {
      while (this.usersData.length === 0) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        this.usersData = data;
      }
      if (this.usersData.length > 0) {
        this.dataSource = new MatTableDataSource(this.usersData);
      }
     });
    this.selectedUsers = null;
    */
  }


 /* applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/


}
