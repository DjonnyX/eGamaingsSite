import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GamesStore } from 'src/app/state/games.store';

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
]

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent implements OnInit {

  categories = CATEGORIES;

  constructor(private _store: GamesStore) { }

  ngOnInit(): void { }

  changeCategories(selectedCategories: Array<string>) {
    this._store.querySetCategoriesFilter(selectedCategories);
  }
}
