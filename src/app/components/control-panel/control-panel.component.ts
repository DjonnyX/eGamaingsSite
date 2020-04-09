import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GamesStore } from 'src/app/state/games.store';
import { Observable } from 'rxjs';
import { IPaginationParams } from '../paginator/interfaces';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
