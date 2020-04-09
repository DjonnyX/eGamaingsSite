import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { GamesModule } from './pages/games/games.module';


const routes: Routes = [{
  path: "",
  redirectTo: "games",
  pathMatch: "full"
},
{
  path: "games",
  component: GamesComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    GamesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
