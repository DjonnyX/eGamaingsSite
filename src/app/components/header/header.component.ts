import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesStore } from 'src/app/state/games.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  totalGamesPerPage$: Observable<number>;

  constructor(private _store: GamesStore) {
    this.totalGamesPerPage$ = _store.selectGamesLengthPerPage();
  }

  ngOnInit(): void {
  }

}
