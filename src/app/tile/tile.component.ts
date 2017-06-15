import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mine } from '../mine.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() mines: Mine[];
  @Output() sendCheckTile = new EventEmitter();
  @Output() sendGameOver = new EventEmitter();
  mine: Mine;

  constructor(
  ) { }

  ngOnInit() {

  }

  checkTile(mine: Mine) {
    if (!mine.isFlagged) {
      if (mine.isBomb && !mine.isClicked) {
        mine.isClicked = true;
        alert('Game Over');
        this.sendGameOver.emit();
      } else {
        this.sendCheckTile.emit(mine);
      }
    }
  }

  toggleFlag(mine: Mine) {
    if (mine.isFlagged) {
        mine.isFlagged = false;
    } else {
      mine.isFlagged = true;
    }
  }

}
