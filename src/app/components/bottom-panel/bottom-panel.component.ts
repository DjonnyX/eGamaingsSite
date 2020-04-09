import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesStore } from 'src/app/state/games.store';
import { IPaginationParams } from '../paginator/interfaces';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss']
})
export class BottomPanelComponent implements OnInit {

  totalGamesLength$: Observable<number>;

  constructor(private _store: GamesStore) { }

  ngOnInit(): void {
    this.totalGamesLength$ = this._store.selectGamesTotalLength();
  }

  paginatorChange(data: IPaginationParams) {
    this._store.querySetPagination(data);
  }
}
