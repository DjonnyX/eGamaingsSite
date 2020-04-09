import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPaginationParams } from './interfaces';
import { Debounse } from 'src/app/utils/debounse.util';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Output() change = new EventEmitter<IPaginationParams>();

  itemsOnPage = [
    5,
    10,
    20,
    50,
    100
  ]

  paginationInfo$ = new BehaviorSubject<string>("");

  private _total: number = 0;
  @Input() set total(total: number) {
    this._total = total;
    this._page = 1;
    this.updateParams();
  };

  private _page: number = 1;
  @Input() set page(page: number) {
    this._page = page;
    this.updateParams();
  }

  private _limit: number = this.itemsOnPage[0];
  set limit(limit: number) {
    this._limit = limit;
    this._page = 1;
    this.updateParams();
  }
  get limit() {
    return this._limit;
  }

  totalPages: number;

  isNextActive: boolean;

  isPrevActive: boolean;

  private _debounceEmitValue = new Debounse(() => {
    this.emitValue();
  }, 5);

  constructor() { }

  ngOnInit(): void {}

  updateParams() {
    this.totalPages = Math.ceil(this._total / this._limit);
    const leftItems = this._page * this._limit;
    this.paginationInfo$.next(`${this._page} of ${this.totalPages}`);

    this.isNextActive = leftItems >= this._total;
    this.isPrevActive = this._page > 1;

    this._debounceEmitValue.call();
  }

  emitValue() {
    this.change.emit({
      page: this._page,
      limit: this._limit,
    });
  }

  changeItemsPerPage(limit: string) {
    this.limit = Number.parseInt(limit);
  }

  onPrevious(event) {
    if (this._page > 1) {
      this._page -= 1;

      this.updateParams();
    }
  }

  onNext(event) {
    if (this._page < this.totalPages) {
      this._page += 1;

      this.updateParams();
    }
  }

  ngOnDestroy() {
    this._debounceEmitValue.dispose();
    this._debounceEmitValue = null;
  }
}
