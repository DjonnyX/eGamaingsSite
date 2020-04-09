import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { Observable, forkJoin, concat, merge, combineLatest } from 'rxjs';
import { IGameModel } from 'src/app/models/IGameModel';
import { GamesStore } from 'src/app/state/games.store';
import { GameCardComponent } from './game-card/game-card.component';
import { FavoriteGamesService } from 'src/app/state/favorite-games.service';
import { map} from 'rxjs/operators';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamesListComponent implements OnInit {
  @ViewChild(GameCardComponent) _gameCardComponent: GameCardComponent;

  gamesList$: Observable<Array<IGameModel>>;

  favoriteGamesList$: Observable<Array<IGameModel>>;

  compositeGameList$: Observable<Array<IGameModel>>;

  constructor(private _gamesStore: GamesStore, private _favoriteGamesStore: FavoriteGamesService) {
    this.gamesList$ = _gamesStore.selectGamesList();
    this.favoriteGamesList$ = _favoriteGamesStore.selectGamesList();

    this.compositeGameList$ = combineLatest(this.favoriteGamesList$, this.gamesList$).pipe(
      map(([x, y]) => x.concat(y))
    )
  }

  ngOnInit(): void { }

  saveAsFavorite(id: string): void {
    this._favoriteGamesStore.querySaveGameById(id);
  }
  
  removeFavorite(id: string): void {
    this._favoriteGamesStore.queryRemoveGameById(id);
  }
}
