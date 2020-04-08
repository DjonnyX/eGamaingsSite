import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from 'src/app/components/control-panel/control-panel.component';
import { SearchGamesComponent } from 'src/app/components/control-panel/search-games/search-games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ControlPanelComponent,
    SearchGamesComponent
  ],
  exports: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ControlPanelModule { }
