import { Router } from '@angular/router';
import { UsersComponent } from './../users/users.component';
import { User } from './../../../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  title = 'Users';
  @Input() users: User[];
  @Input() user: User;
  selectedUsers: User;
  dataSource;
  usersData: any = [];
  loading = true;
  @Output() selectedUser = new EventEmitter();
  displayedColumns: string[] = ['position', 'weight', 'detail', 'choice'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(UsersComponent, {static: true}) userComponent: UsersComponent;


  constructor(
    private router: Router,
    private userService: UsersService,
  ) {

   }

  ngOnInit() {
   // this.displayedColumns = ['position', 'name'];
    setTimeout(() =>{
      this.loading = false;
    }, 1000);
    this.userService.getUsers().subscribe((data) => {
      this.usersData = data;
      this.dataSource = new MatTableDataSource(this.usersData);
     // console.log("Initialisation",this.users);
     });

    this.selectedUsers = null;
    this.dataSource.paginator = this.paginator;
  }

  loadUser(){
    // const users: User = [];
     return this.userService.getUsers().subscribe((data) => {
      this.usersData = data;
     // console.log("Initialisation",this.users);
     });
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row) {
    return this.userService.getUserByUsername(row.username).subscribe(( data ) => {
      this.selectedUsers = data;
      this.selectedUser.emit(
        this.selectedUsers
      );
      this.router.navigate(['/users/detail']);
     });

      //this.router.navigate(['detail'])
      //console.log('le row est: ', row);
  }

}
