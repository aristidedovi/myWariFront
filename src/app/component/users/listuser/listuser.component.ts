import { User } from './../../../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  title = 'Users';
  @Input() users: User[];
  @Input() user: User;
  dataSource;
  displayedColumns: string[];
  loading = true;
  @Output() selectedUser = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.displayedColumns = ['position', 'name'];
    this.dataSource = new MatTableDataSource(this.users);
    //console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    setTimeout(() =>{
      this.loading = false;
    }, 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row) {
      this.selectedUser.emit(
        row
      );
      //console.log('le row est: ', row);
  }

}
