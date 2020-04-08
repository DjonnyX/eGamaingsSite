import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {

  itemsOnPage = [
    5,
    10,
    50,
    100
  ]

  paginationInfo$: Observable<string>;

  constructor() { }

  ngOnInit(): void {

  }

  onPrevious(event) {

  }

  onNext(event) {

  }
}
