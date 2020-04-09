import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GamesStore } from 'src/app/state/games.store';
import { SelectComponent } from '../select/select.component';

const CATEGORIES = [
  "Evolution",
  "AsiaGaming",
  "BetGames",
  "LuckyStreak",
  "AuthenticGaming",
  "OrientalGame",
  "VivoGaming",
  "Ezugi",
  "SAGaming",
  "XProGaming",
];

const SORT_ITEMS = [
  "none",
  "name",
];

const ORDER_ITEMS = [
  "none",
  "descending",
  "ascent",
]

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent implements OnInit {

  @ViewChild("sortBy") _sortByComponent: SelectComponent;
  @ViewChild("orderBy") _orderByComponent: SelectComponent;

  categories = CATEGORIES;

  sortItems = SORT_ITEMS;

  orderItems = ORDER_ITEMS;

  disableOrderBy = true;

  constructor(private _store: GamesStore) { }

  ngOnInit(): void { }

  changeCategories(selectedCategories: Array<string>): void {
    this._store.querySetCategoriesFilter(selectedCategories);
  }

  changeSort(sortBy: string): void {
    if (sortBy === "none") {
      this.disableOrderBy = true;
      this._sortByComponent.reset();
    } else {
      this.disableOrderBy = false;
    }

    this._store.querySetSortByFilter(sortBy);
  }

  changeOrder(orderBy: string): void {
    let value: string;
    switch (orderBy) {
      case "none": this._orderByComponent.reset(); value = orderBy; break;
      case "descending": value = 'DESC'; break;
      case "ascent": value = 'ASC'; break;
    }

    this._store.queryOrderByFilter(value);
  }
}
