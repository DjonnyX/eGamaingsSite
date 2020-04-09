import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GamesStore } from 'src/app/state/games.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPaginationParams } from '../paginator/interfaces';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlPanelComponent implements OnInit {

  totalGamesLength$: Observable<number>;

  constructor(private _store: GamesStore) { }

  ngOnInit(): void {
    this.totalGamesLength$ = this._store.selectGamesTotalLength();
  }

  paginatorChange(data: IPaginationParams) {
    this._store.querySetPagination(data);
  }
}
