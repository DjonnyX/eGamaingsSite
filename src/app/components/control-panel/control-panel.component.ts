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

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent implements OnInit {

  @ViewChild("sortBy") _sortByComponent: SelectComponent;

  categories = CATEGORIES;

  sortItems = SORT_ITEMS;

  constructor(private _store: GamesStore) { }

  ngOnInit(): void { }

  changeCategories(selectedCategories: Array<string>): void {
    this._store.querySetCategoriesFilter(selectedCategories);
  }

  changeSort(sortBy: string): void {
    if (sortBy === "none") {
      this._sortByComponent.reset();
    }

    this._store.querySetSortByFilter(sortBy);
  }
}
