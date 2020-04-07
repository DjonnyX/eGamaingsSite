import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { IGameModel } from 'src/app/models/IGameModel';
import { GamesStore } from 'src/app/state/games.store';
import { GameCardComponent } from './game-card/game-card.component';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamesListComponent implements OnInit {
  @ViewChild(GameCardComponent) _gameCardComponent: GameCardComponent;

  gamesList$: Observable<Array<IGameModel>>;

  constructor(private _gamesStore: GamesStore) {
    this.gamesList$ = _gamesStore.selectGamesList();
  }

  ngOnInit(): void {
    this._gamesStore.queryGetGameList();
  }
}
