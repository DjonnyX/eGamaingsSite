import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from 'src/app/components/control-panel/control-panel.component';
import { SearchGamesModule } from '../search-games/search-games.module';
import { PaginatorModule } from '../paginator/paginator.module';

@NgModule({
  declarations: [
    ControlPanelComponent,
  ],
  exports: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    SearchGamesModule,
    PaginatorModule,
  ]
})
export class ControlPanelModule { }
