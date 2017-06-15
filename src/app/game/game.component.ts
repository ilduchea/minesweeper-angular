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
  minesMaster;
  gameStarted: boolean = false;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.createBoard();
  }

  createBoard() {
    this.gameService.createBoard(10);
    this.minesMaster = this.gameService.mines;
    this.placeMines(10, 10);
    this.findBombs(10);
  }

  placeMines(numberOfMines: number, dimension: number) {
    let minesPlanted: number = 0;

    if (!this.gameStarted) {
      while (minesPlanted < numberOfMines) {
        let x = this.getRandomNumber(dimension);
        let y = this.getRandomNumber(dimension);

        if (!this.minesMaster[x][y].isBomb)
        {
            this.minesMaster[x][y].isBomb = true;
            this.minesMaster[x][y].clickedClass = 'bomb';
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

        if (!this.minesMaster[x][y].isBomb) {
          if (x-1 >= 0 && y-1 >= 0 && this.minesMaster[x-1][y-1].isBomb) {
            numberOfBombs++;
          }
          if (y-1 >= 0 && this.minesMaster[x][y-1].isBomb) {
            numberOfBombs++;
          }
          if (y-1 >= 0 && x+1 < dimensions && this.minesMaster[x+1][y-1].isBomb) {
            numberOfBombs++;
          }
          if (x-1 >= 0 && this.minesMaster[x-1][y].isBomb) {
            numberOfBombs++;
          }
          if (x+1 < dimensions && this.minesMaster[x+1][y].isBomb) {
            numberOfBombs++;
          }
          if (x-1 >= 0 && y+1 < dimensions && this.minesMaster[x-1][y+1].isBomb) {
            numberOfBombs++;
          }
          if (y+1 < dimensions && this.minesMaster[x][y+1].isBomb) {
            numberOfBombs++;
          }
          if (x+1 < dimensions && y+1 < dimensions && this.minesMaster[x+1][y+1].isBomb) {
            numberOfBombs++;
          }

          this.minesMaster[x][y].display = numberOfBombs;

          if (numberOfBombs == 1) {this.minesMaster[x][y].clickedClass = 'one'}
          if (numberOfBombs == 2) {this.minesMaster[x][y].clickedClass = 'two'}
          if (numberOfBombs == 3) {this.minesMaster[x][y].clickedClass = 'three'}
          if (numberOfBombs == 4) {this.minesMaster[x][y].clickedClass = 'four'}
          if (numberOfBombs == 5) {this.minesMaster[x][y].clickedClass = 'five'}
          if (numberOfBombs == 6) {this.minesMaster[x][y].clickedClass = 'six'}
          if (numberOfBombs == 7) {this.minesMaster[x][y].clickedClass = 'seven'}
          if (numberOfBombs == 8) {this.minesMaster[x][y].clickedClass = 'eight'}
        }
      }
    }
  }

}
