import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from 'src/app/components/control-panel/control-panel.component';
import { SearchGamesModule } from '../search-games/search-games.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { SelectModule } from '../select/select.module';

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
    SelectModule,
  ]
})
export class ControlPanelModule { }
