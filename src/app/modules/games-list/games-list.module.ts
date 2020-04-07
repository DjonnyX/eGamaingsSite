import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { GameCardComponent } from '../../components/games-list/game-card/game-card.component';


@NgModule({
  declarations: [
    GamesListComponent,
    GameCardComponent
  ],
  exports: [
    GamesListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GamesListModule { }
