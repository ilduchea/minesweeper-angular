import { Injectable } from '@angular/core';
import { Mine } from './mine.model';

@Injectable()
export class GameService {
  mines: Mine[] = [];

  constructor() { }

  createBoard(dimensions) {
    for (let y = 1; y <= dimensions; y++) {
      for (let x = 1; x <= dimensions; x++) {
        let newMine: Mine = new Mine(false, y, x);
        this.mines.push(newMine);
        console.log(newMine);
      }
    }
  }

}
