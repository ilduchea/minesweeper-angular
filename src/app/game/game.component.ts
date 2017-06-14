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

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {    
  }

  createBoard() {
    this.gameService.createBoard(10);
    this.mines = this.gameService.mines;
    console.log('mines', this.mines.length)
  }

}
