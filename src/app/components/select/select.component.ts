import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

const OPT_SELECT_CLASS = "same-as-selected";
const SELECT_ARROW_ACTIVE_CLASS = "select-arrow-active";
const SELECT_HIDE_CLASS = "select-hide";
const OVERLAY_HIDDEN_CLASS = "hidden";

export enum SelectDirection {
  Top,
  Bottom,
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectSelected') _selectSelected: ElementRef;
  @ViewChild('selectItems') _selectItems: ElementRef;
  @ViewChild('overlay') _overlay: ElementRef;

  @Output() onChange = new EventEmitter<string | string[]>();

  @Input() items: Array<string>;
  @Input() multiselect = false;
  @Input() placeholder = "";
  @Input() direction: SelectDirection;
  @Input() autoselectFirst = true;

  private _valueChanges;
  public get valueChanges() {
    return this._valueChanges.asObservable();
  }

  private _isExpanded = false;

  private _selectedElement: HTMLElement;

  private _valueChangesSubscr: Subscription;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this._valueChanges = new BehaviorSubject<string | string[]>(this.multiselect ? [] : "");

    this._valueChangesSubscr = this.valueChanges.subscribe(
      (value: string) => {
        if (value) {
          this.onChange.next(value);
        }
      }
    )

    this.setDefaultValue();
  }

  reset(): void {
    if (!this.autoselectFirst) {
      const elem = this._selectSelected.nativeElement as HTMLElement;
      elem.innerHTML = this.placeholder;

      const elemItems = this._selectItems.nativeElement as HTMLElement;
      const options = elemItems.childNodes;
      for (let i = 0, l = options.length; i < l; i++) {
        const option = options[i] as HTMLElement;
        if (option.classList && option.classList.contains(OPT_SELECT_CLASS)) {
          option.classList.remove(OPT_SELECT_CLASS);
        }
      }
    }
  }

  setDefaultValue(): void {
    const elem = this._selectSelected.nativeElement as HTMLElement;
    const elemItems = this._selectItems.nativeElement as HTMLElement;

    if (this.autoselectFirst) {
      const options = elemItems.childNodes;
      if (!this.multiselect && options.length > 0) {
        this._selectedElement = options[0] as HTMLElement;
        const value = this._selectedElement.innerHTML;
        elem.innerHTML = value;
        this._selectedElement.classList.add(OPT_SELECT_CLASS);

        this._valueChanges.next(value);
      } else if (this.multiselect) {
        elem.innerHTML = this.placeholder;
      }
    } else {
      elem.innerHTML = this.placeholder;
    }
  }

  toggle(): void {
    this._isExpanded = !this._isExpanded;

    const elem = this._selectSelected.nativeElement as HTMLElement;
    const elemItems = this._selectItems.nativeElement as HTMLElement;
    const overlay = this._overlay.nativeElement as HTMLElement;
    if (this._isExpanded) {
      overlay.classList.remove(OVERLAY_HIDDEN_CLASS);
      elem.classList.add(SELECT_ARROW_ACTIVE_CLASS);
      elemItems.classList.remove(SELECT_HIDE_CLASS);
    } else {
      overlay.classList.add(OVERLAY_HIDDEN_CLASS);
      elem.classList.remove(SELECT_ARROW_ACTIVE_CLASS);
      elemItems.classList.add(SELECT_HIDE_CLASS);
    }
  }

  select($event: MouseEvent, value: string) {
    const elem = this._selectSelected.nativeElement as HTMLElement;

    if (!this.multiselect) {
      elem.innerHTML = value;
    }

    if (!this.multiselect && this._selectedElement) {
      this._selectedElement.classList.remove(OPT_SELECT_CLASS);
    }

    this._selectedElement = $event.target as HTMLElement;

    if (this.multiselect && this._selectedElement.classList.contains(OPT_SELECT_CLASS)) {
      this._selectedElement.classList.remove(OPT_SELECT_CLASS);
    } else {
      this._selectedElement.classList.add(OPT_SELECT_CLASS);
    }

    if (this.multiselect) {
      const values = this.getMultiselectValues();

      if (values.length === 0) {
        elem.innerHTML = this.placeholder;
      }

      this._valueChanges.next(values);
    } else {
      this._valueChanges.next(value);
      this.toggle();
    }
  }

  getMultiselectValues() {
    const elemItems = this._selectItems.nativeElement as HTMLElement;
    const result = [];
    const options = elemItems.childNodes;
    for (let i = 0, l = options.length; i < l; i++) {
      const option = options[i] as HTMLElement;
      if (option.classList && option.classList.contains(OPT_SELECT_CLASS)) {
        result.push(option.innerHTML);
      }
    }
    return result;
  }

  ngOnDestroy() {
    this._valueChangesSubscr.unsubscribe();
    this._valueChangesSubscr = null;

    this._selectedElement = null;
  }
}
