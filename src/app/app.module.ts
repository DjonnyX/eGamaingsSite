import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesListModule } from './modules/games-list/games-list.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './modules/header/header.module';
import { ControlPanelModule } from './modules/control-panel/control-panel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GamesListModule,
    HeaderModule,
    ControlPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
