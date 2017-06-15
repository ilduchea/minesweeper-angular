import { Injectable } from '@angular/core';
import { Mine } from './mine.model';

@Injectable()
export class GameService {
  mines: any[] = [];

  constructor() { }

  createBoard(gameDifficulty) {
    for (let x = 0; x < gameDifficulty.height; x++) {
      this.mines[x] = [];
      for (let y = 0; y < gameDifficulty.width; y++) {
        this.mines[x][y] = new Mine(x, y);
      }
    }
  }

}
