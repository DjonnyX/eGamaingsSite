import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, HostListener, Output, EventEmitter } from '@angular/core';
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
  @Output() saveAsFavorite = new EventEmitter();

  @Output() removeFavorite = new EventEmitter();

  @Input() name: string;

  private _isFavorite: boolean;
  @Input() set isFavorite(v: boolean) {
    this._isFavorite = v;
  }
  get isFavorite() {
    return this._isFavorite;
  }

  public isMouseHover$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit(): void { }

  onSaveAsFavorite(): void {
    this.saveAsFavorite.emit();
  }

  onRemoveFavorite(): void {
    this.removeFavorite.emit();
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
  }
}
