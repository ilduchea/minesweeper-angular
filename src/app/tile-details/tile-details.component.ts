import { Component, OnInit, Input } from '@angular/core';
import { Mine } from '../mine.model';

@Component({
  selector: 'app-tile-details',
  templateUrl: './tile-details.component.html',
  styleUrls: ['./tile-details.component.css']
})
export class TileDetailsComponent implements OnInit {
  @Input() mine: Mine;
  clickedClass: string = this.mine.clickedClass;

  constructor() { }

  ngOnInit() {
    console.log(this.mine)
  }

}
