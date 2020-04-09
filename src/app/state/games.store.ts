import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGameModel } from '../models/IGameModel';
import { ApiService, IGameFilterParams } from '../services/api.service';
import { map } from 'rxjs/operators';
import { IRequestParams } from '../utils/srv-request.util';

import { IPaginationParams } from '../components/paginator/interfaces';
import { Debounse } from '../utils/debounse.util';

@Injectable({
  providedIn: 'root'
})
export class GamesStore {

  private _totalGames = new BehaviorSubject<number>(0);
  
  private _isLoading = new BehaviorSubject<boolean>(true);

  private _gamesList = new BehaviorSubject<Array<IGameModel>>([]);

  private _filter: IRequestParams<IGameFilterParams> = { filter: [] };

  private _debounceGetGames = new Debounse(() => {this._getGames()}, 250);

  private _filterName: string;

  private _filterCategories: IGameFilterParams[];

  private _filterSortBy: string;

  constructor(private _apiService: ApiService) { }

  private _getGames() {
    this._isLoading.next(true);

    this._apiService.getGames(this._filter).subscribe(
      (data) => {
        this._isLoading.next(false);
        this._totalGames.next(data.total);
        this._gamesList.next(data.items)
      }
    );
  }

  private normalizedCategFilter(categories: string[]): IGameFilterParams[] {
    const result = [];
    for (let i = 0, l = categories.length; i < l; i ++) {
      const categ = categories[i];
      result.push({tag: categ});
    }
    return result;
  }

  private composeFilter() {
    const filter = this._filterCategories;

    if (this._filterName && this._filterName !== "") {
      filter.push({name: this._filterName});
    }

    if (this._filterSortBy === "none") {
      delete this._filter.sortBy;
    } else {
      this._filter.sortBy = this._filterSortBy;
    }

    this._filter.filter = filter;
  }

  // query

  queryGetGameList() {
    this._debounceGetGames.call();
  }

  querySearchByName(value: string) {
    this._filterName = value;

    this.composeFilter();

    this.queryGetGameList();
  }

  querySetPagination(data: IPaginationParams) {
    this._filter.paging = data;
    this.queryGetGameList();
  }

  querySetCategoriesFilter(categories: string[]) {
    this._filterCategories = this.normalizedCategFilter(categories);
  
    this.composeFilter();
  
    this.queryGetGameList();
  }

  querySetSortByFilter(sortBy: string) {
    this._filterSortBy = sortBy;

    this.composeFilter();
  
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

  selectGamesTotalLength() {
    return this._totalGames.pipe(
      map(total => total),
    )
  }

  selectIsLoading() {
    return this._isLoading.pipe(
      map(val => val),
    )
  }
}
