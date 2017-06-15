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

  gameDifficulty: any = {
    height: 10,
    width: 10,
    mines: 10,
  };

  revealedTiles: number = 0;
  safeTiles: number = (this.gameDifficulty.height * this.gameDifficulty.width) - this.gameDifficulty.mines;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.createBoard();
  }

  setDifficulty(difficulty: string) {
    if (difficulty == 'easy') {
      this.gameDifficulty = {
        height: 10,
        width: 10,
        mines: 10,
      }
    }
    if (difficulty == 'intermediate') {
      this.gameDifficulty = {
        height: 16,
        width: 16,
        mines: 40,
      }
    }
    if (difficulty == 'extreme') {
      this.gameDifficulty = {
        height: 16,
        width: 32,
        mines: 99,
      }
    }
    this.newGame();
  }

  createBoard() {
    this.gameService.createBoard(this.gameDifficulty);
    this.minesMaster = this.gameService.mines;
  }

  newGame() {
    this.gameService.mines = [];
    this.gameStarted = false;
    this.revealedTiles = 0;
    this.createBoard();
  }

  gameOver() {
    this.minesMaster.forEach(mines => {
      mines.forEach(mine => {
        mine.isClicked = true;
      });
    });
  }

  placeMines(gameDifficulty) {
    let height: number = gameDifficulty.height;
    let width: number = gameDifficulty.width;
    let mines: number = gameDifficulty.mines;
    let minesPlanted: number = 0;

    if (!this.gameStarted) {
      while (minesPlanted < mines) {
        let x = this.getRandomNumber(height);
        let y = this.getRandomNumber(width);

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

  findBombs(gameDifficulty) {
    for (let x = 0; x < gameDifficulty.height; x++) {
      for (let y = 0; y < gameDifficulty.width; y++) {
        let numberOfBombs: number = 0;

        if (!this.minesMaster[x][y].isBomb) {
          if (x-1 >= 0 && y-1 >= 0 && this.minesMaster[x-1][y-1].isBomb) {
            numberOfBombs++;
          }
          if (y-1 >= 0 && this.minesMaster[x][y-1].isBomb) {
            numberOfBombs++;
          }
          if (y-1 >= 0 && x+1 < gameDifficulty.height && this.minesMaster[x+1][y-1].isBomb) {
            numberOfBombs++;
          }
          if (x-1 >= 0 && this.minesMaster[x-1][y].isBomb) {
            numberOfBombs++;
          }
          if (x+1 < gameDifficulty.height && this.minesMaster[x+1][y].isBomb) {
            numberOfBombs++;
          }
          if (x-1 >= 0 && y+1 < gameDifficulty.width && this.minesMaster[x-1][y+1].isBomb) {
            numberOfBombs++;
          }
          if (y+1 < gameDifficulty.width && this.minesMaster[x][y+1].isBomb) {
            numberOfBombs++;
          }
          if (x+1 < gameDifficulty.height && y+1 < gameDifficulty.width && this.minesMaster[x+1][y+1].isBomb) {
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

  checkTiles(mine: Mine) {
    let x: number = mine.x;
    let y: number = mine.y;

    if (!this.gameStarted) {
      this.placeMines(this.gameDifficulty);
      this.findBombs(this.gameDifficulty);
    }

    if (mine.display < 9) {
      mine.isClicked = true;
      this.revealedTiles++;
      if (mine.display == 0) {
        if (x-1 >= 0 && y-1 >= 0 && !this.minesMaster[x-1][y-1].isClicked) {
          this.checkTiles(this.minesMaster[x-1][y-1]);
        }
        if (y-1 >= 0 && !this.minesMaster[x][y-1].isClicked) {
          this.checkTiles(this.minesMaster[x][y-1]);
        }
        if (y-1 >= 0 && x+1 < this.gameDifficulty.height && !this.minesMaster[x+1][y-1].isClicked) {
          this.checkTiles(this.minesMaster[x+1][y-1]);
        }
        if (x-1 >= 0 && !this.minesMaster[x-1][y].isClicked) {
          this.checkTiles(this.minesMaster[x-1][y]);
        }
        if (x+1 < this.gameDifficulty.height && !this.minesMaster[x+1][y].isClicked) {
          this.checkTiles(this.minesMaster[x+1][y]);
        }
        if (x-1 >= 0 && y+1 < this.gameDifficulty.width && !this.minesMaster[x-1][y+1].isClicked) {
          this.checkTiles(this.minesMaster[x-1][y+1]);
        }
        if (y+1 < this.gameDifficulty.width && !this.minesMaster[x][y+1].isClicked) {
          this.checkTiles(this.minesMaster[x][y+1]);
        }
        if (x+1 < this.gameDifficulty.height && y+1 < this.gameDifficulty.width && !this.minesMaster[x+1][y+1].isClicked) {
          this.checkTiles(this.minesMaster[x+1][y+1]);
        }
      }
      if (this.revealedTiles == this.safeTiles) {
        this.gameOver();
        alert('You Won!!!');
      }
    }
  }

}
