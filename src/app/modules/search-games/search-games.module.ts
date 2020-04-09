import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchGamesComponent } from 'src/app/components/search-games/search-games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchGamesComponent
  ],
  exports: [
    SearchGamesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SearchGamesModule { }
