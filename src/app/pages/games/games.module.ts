import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from '../games/games.component';
import { GamesListModule } from 'src/app/modules/games-list/games-list.module';
import { HeaderModule } from 'src/app/modules/header/header.module';
import { ControlPanelModule } from 'src/app/modules/control-panel/control-panel.module';
import { PaginatorModule } from 'src/app/modules/paginator/paginator.module';
import { BottomPanelModule } from 'src/app/modules/bottom-panel/bottom-panel.module';

@NgModule({
  declarations: [
    GamesComponent
  ],
  exports: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesListModule,
    HeaderModule,
    ControlPanelModule,
    PaginatorModule,
    BottomPanelModule
  ]
})
export class GamesModule { }
