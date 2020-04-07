import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesListModule } from './modules/games-list/games-list.module';
import { HttpClientModule } from '@angular/common/http';
import { GameCardComponent } from './components/games-list/game-card/game-card.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GamesListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
