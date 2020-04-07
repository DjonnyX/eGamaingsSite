import { Component, NgZone } from '@angular/core';
import { environment } from '../environments/environment';
import { akitaDevtools } from '@datorama/akita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(_ngZone: NgZone) {
    if (!environment.production) {
      akitaDevtools(_ngZone);
    }
  }
}
