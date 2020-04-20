import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detailcompte',
  templateUrl: './detailcompte.component.html',
  styleUrls: ['./detailcompte.component.css']
})
export class DetailcompteComponent implements OnInit {

  @Input() compte: any;
  isSelected = false;

  constructor() { }

  ngOnInit() {
    if(this.compte != null){
      this.isSelected = true;
    }
  }

}
