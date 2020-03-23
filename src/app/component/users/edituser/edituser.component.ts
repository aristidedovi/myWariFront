import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  attr: any;
  id: number;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.firstChild.params.subscribe(
      params => {
        this.id = params.userId
       // console.log(params);
      }
    );
    //console.log(this.route.firstChild);
    console.log(this.id);
  }

}
