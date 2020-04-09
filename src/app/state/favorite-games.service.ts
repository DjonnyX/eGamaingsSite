import { Injectable } from '@angular/core';
import { Debounse } from '../utils/debounse.util';
import { BehaviorSubject } from 'rxjs';
import { ApiService, IGameFilterParams } from '../services/api.service';
import { IGameModel } from '../models/IGameModel';
import { IRequestParams } from '../utils/srv-request.util';
import { map } from 'rxjs/operators';

const FAVORITE_GAMES_KEY = "favoriteGames";

@Injectable({
  providedIn: 'root'
})
export class FavoriteGamesService {

  private _isLoading = new BehaviorSubject<boolean>(true);

  private _gamesList = new BehaviorSubject<Array<IGameModel>>([]);

  private _filter: IRequestParams<IGameFilterParams> = { filter: [] };

  private _debounceGetGames = new Debounse(() => { this._getGames() }, 250);

  private _ids = new Array<string>();

  constructor(private _apiService: ApiService) {
    this._loadSavedFavoriteGames();
  }

  /**
   * Нормализация id's для дальнейшей фильтрации
   * @param {string[]} ids
   */
  private normalizedIdsFilter(ids: string[]): IGameFilterParams[] {
    const result = [];
    if (ids) {
      for (let i = 0, l = ids.length; i < l; i++) {
        const id = ids[i];
        result.push({ id: id });
      }
    }
    return result;
  }

  /**
   * Загрузка id's из localStorage
   * Далее запрос к серверу с фильтрацией по id's
   */
  private _loadSavedFavoriteGames(): void {
    const idsStr = localStorage.getItem(FAVORITE_GAMES_KEY);

    let ids: string[];

    try {
      ids = JSON.parse(idsStr);
      this._ids = ids;
    } catch (e) {
      // стор пуст
      this._ids = [];
    }
    
    this.setFilter();
    
    this.queryGetFavoriteGames();
  }

  /**
   * Нормализует массив фильтрации
   * и присваивает их фильтру
   */
  private setFilter(): void {
    const filter = this.normalizedIdsFilter(this._ids);
    this._filter.filter = filter;
  }

  /**
   * Запрос к серверу
   */
  private _getGames(): void {
    this._isLoading.next(true);

    this._apiService.getGames(this._filter).subscribe(
      (data) => {
        const items = data.items.map(v => {
          v._isFavorite = true;
          return v;
        });

        this._isLoading.next(false);
        this._gamesList.next(items);
      }
    );
  }

  private _saveToLocalStorage(): void {
    const idsStr = JSON.stringify(this._ids);

    localStorage.setItem(FAVORITE_GAMES_KEY, idsStr);
  }

  // query

  queryGetFavoriteGames(): void {
    if (!this._ids) this._ids = [];

    if (this._ids.length > 0) {
      this._debounceGetGames.call();
    } else {
      this._gamesList.next([]);
    }
  }

  querySaveGameById(id: string): void {
    if (this._ids.indexOf(id) >= 0) return;

    this._ids.push(id);

    this._saveToLocalStorage();

    this.setFilter();

    this.queryGetFavoriteGames();
  }

  queryRemoveGameById(id: string): void {
    const index = this._ids.indexOf(id);
    if (index === -1) return;

    this._ids.splice(index, 1);

    this._saveToLocalStorage();

    this.setFilter();

    this.queryGetFavoriteGames();
  }

  // selectors

  selectGamesList() {
    return this._gamesList.asObservable();
  }
}
