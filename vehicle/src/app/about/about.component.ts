import { Component, OnInit } from '@angular/core';
import * as loremimpsum from 'lorem-ipsum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public text = " text";
  constructor() {
    /*this.text = loremimpsum({
      count: 5,
      units: 'paragraphs'
    })*/
  }

  ngOnInit() {
    
  }

}
