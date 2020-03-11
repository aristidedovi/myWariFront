import { User } from 'src/app/models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-itemuser',
  templateUrl: './itemuser.component.html',
  styleUrls: ['./itemuser.component.css']
})
export class ItemuserComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
