import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGameModel } from '../models/IGameModel';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class GamesStore {

  totalGames = new BehaviorSubject<number>(0);

  gamesList = new BehaviorSubject<Array<IGameModel>>([]);

  constructor(private _apiService: ApiService) {}

  updateGameList() {
    this._apiService.getGames().subscribe(
      (data) => {
        this.totalGames.next(data.total);
        this.gamesList.next(data.items)
      }
    );
  }
}
