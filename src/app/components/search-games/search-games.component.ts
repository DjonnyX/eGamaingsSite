import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GamesStore } from 'src/app/state/games.store';

const AC_DEBOUNCE = 200;

@Component({
  selector: 'app-search-games',
  templateUrl: './search-games.component.html',
  styleUrls: ['./search-games.component.scss']
})
export class SearchGamesComponent implements OnInit {

  formGroup: FormGroup;
  
  ctrlSearch: FormControl;
  
  value$: Observable<string>;

  constructor(private _formBuilder: FormBuilder, private _store: GamesStore) {
    this.createFormControls();
  }

  ngOnInit(): void {
  }

  private createFormControls() {
    this.ctrlSearch = new FormControl('');

    this.formGroup = this._formBuilder.group({
      search: this.ctrlSearch,
    });

    this.formSubscription();
  }

  private formSubscription() {
    this.ctrlSearch.valueChanges.pipe(
      map(val => {
        return val || ''
      }),
      startWith(null),
      debounceTime(AC_DEBOUNCE),
      distinctUntilChanged(),
      map(val => {
        return val || ''
      }),
    ).subscribe(
      (data => {
        this._store.querySearchByName(data);
      })
    )
  }
}
