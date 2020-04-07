import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGameModel } from '../models/IGameModel';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesStore {

  private _totalGames = new BehaviorSubject<number>(0);

  private _gamesList = new BehaviorSubject<Array<IGameModel>>([]);

  constructor(private _apiService: ApiService) {}

  queryGetGameList() {
    this._apiService.getGames().subscribe(
      (data) => {
        this._totalGames.next(data.total);
        this._gamesList.next(data.items)
      }
    );
  }

  selectGamesList() {
    return this._gamesList.pipe(
      map(items => items),
    )
  }

  selectGamesLengthPerPage() {
    return this._gamesList.pipe(
      map(items => items.length),
    )
  }
}
