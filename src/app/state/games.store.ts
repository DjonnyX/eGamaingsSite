import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGameModel } from '../models/IGameModel';
import { ApiService, IGameFilterParams } from '../services/api.service';
import { map } from 'rxjs/operators';
import { IRequestParams } from '../utils/srv-request.util';

@Injectable({
  providedIn: 'root'
})
export class GamesStore {

  private _totalGames = new BehaviorSubject<number>(0);

  private _gamesList = new BehaviorSubject<Array<IGameModel>>([]);

  private _filter: IRequestParams<IGameFilterParams> = { filter: [] };

  constructor(private _apiService: ApiService) { }

  // query

  queryGetGameList() {
    this._apiService.getGames(this._filter).subscribe(
      (data) => {
        this._totalGames.next(data.total);
        this._gamesList.next(data.items)
      }
    );
  }

  querySearchByName(value: string) {
    this._filter.filter = [];
    if (value && value !== "") {
      this._filter.filter.push({ name: value });
    }
    this.queryGetGameList();
  }

  // selectors

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

  selectGamesLength() {
    return this._totalGames.pipe(
      map(total => total),
    )
  }
}
