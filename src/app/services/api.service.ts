import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {IGameModel} from '../models/IGameModel';
import { createRequestParams, IRequestParams } from '../utils/srv-request.util';


const API_URL = '/api/';

enum ApiRouteNames {
  GAMES = 'games',
}

export class ApiRoutes {
  private static _games = `${API_URL}${ApiRouteNames.GAMES}`;

  static get GAMES() { return ApiRoutes._games; }
}

interface IGameFilterParams {
  id?: number;
  name?: string;
  tag?: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  /**
   * Выполняет GET-запрос к json-server'у с параметрами фильтрации, сортировки, etc
   */
  protected get<T, F>(url: string, options: IRequestParams<F>) {
    const opt = createRequestParams(options);
    return this._http.get<T>(url, {
      params: opt,
      observe: 'response'
    }).pipe(
      map(res => ({
          total: Number(res.headers.get('X-Total-Count')),
          items: res.body
        })
      )
    )
  }

  /**
   * Получение списка игр с заданными параметрами фильтрации
   */
  getGames(filter?: IRequestParams<IGameFilterParams>) {
    return this.get<Array<IGameModel>, IGameFilterParams>(ApiRoutes.GAMES, filter);
  }

  /**
   * Обновление выбранной игры
   * Для выставления флага <code>isFavorite</code>
   */
  /*updateGames(game: IGameModel) {
    return this._http.put<IGameModel>(`${ApiRoutes.GAMES}/${game.id}`, game);
  }*/
}
