import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "game-card"
  }
})
export class GameCardComponent implements OnInit, OnDestroy {

  @Input() name: string;

  @Input() isFavorite: boolean;

  public isMouseHover$ = new BehaviorSubject<boolean>(false);

  public isFavorite$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit(): void {

  }

  @HostListener('mouseover')
  onMouseOver() {
    // expand
    this.isMouseHover$.next(true);
  }

  @HostListener('mouseout')
  onMouseOut() {
    // collapse
    this.isMouseHover$.next(false);
  }

  ngOnDestroy() {
    this.isMouseHover$.unsubscribe();
    this.isMouseHover$ = null;
    this.isFavorite$.unsubscribe();
    this.isFavorite$ = null;
  }
}
