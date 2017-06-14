import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Mine } from '../mine.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
  mines;
  gameStarted: boolean = false;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.createBoard();
  }

  createBoard() {
    this.gameService.createBoard(10);
    this.mines = this.gameService.mines;
  }

  placeMines(numberOfMines: number, dimension: number) {
    let minesPlanted: number = 0;

    if (!this.gameStarted) {
      while (minesPlanted < numberOfMines) {
        let x = this.getRandomNumber(dimension);
        let y = this.getRandomNumber(dimension);

        if (!this.mines[x][y].isBomb)
        {
            this.mines[x][y].isBomb = true;
            this.mines[x][y].display = 'X';
            minesPlanted++;
        }
      }

      this.gameStarted = true;
    } else {
      console.log('reload page');
    }

  }

  getRandomNumber(dimension: number) {
    return Math.floor((Math.random() * dimension));
  }

  findBombs(dimensions: number) {
    for (let x = 0; x < dimensions; x++) {
      for (let y = 0; y < dimensions; y++) {
        let numberOfBombs: number = 0;

        if (!this.mines[x][y].isBomb) {
          if (x-1 >= 0 && y-1 >= 0 && this.mines[x-1][y-1].isBomb) {
            numberOfBombs++;
          }
          if (y-1 >= 0 && this.mines[x][y-1].isBomb) {
            numberOfBombs++;
          }
          if (y-1 >= 0 && x+1 < dimensions && this.mines[x+1][y-1].isBomb) {
            numberOfBombs++;
          }
          if (x-1 >= 0 && this.mines[x-1][y].isBomb) {
            numberOfBombs++;
          }
          if (x+1 < dimensions && this.mines[x+1][y].isBomb) {
            numberOfBombs++;
          }
          if (x-1 >= 0 && y+1 < dimensions && this.mines[x-1][y+1].isBomb) {
            numberOfBombs++;
          }
          if (y+1 < dimensions && this.mines[x][y+1].isBomb) {
            numberOfBombs++;
          }
          if (x+1 < dimensions && y+1 < dimensions && this.mines[x+1][y+1].isBomb) {
            numberOfBombs++;
          }

          if (numberOfBombs == 0) {
            this.mines[x][y].display = '-';
          } else {
            this.mines[x][y].display = numberOfBombs;
          }
        }
      }
    }
  }

}
