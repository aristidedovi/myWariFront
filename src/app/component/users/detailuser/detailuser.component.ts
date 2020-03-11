import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css']
})
export class DetailuserComponent implements OnInit {

  @Input() user: User;


  constructor() { }

  ngOnInit() {

  }
  onSelected(event){
    console.log()
  }

}
