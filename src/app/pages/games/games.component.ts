import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesStore } from 'src/app/state/games.store';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  
  isLoading$: Observable<boolean>;

  constructor(private _gamesStore: GamesStore) {
    this.isLoading$ = _gamesStore.selectIsLoading();
  }

  ngOnInit(): void {
  }

}
