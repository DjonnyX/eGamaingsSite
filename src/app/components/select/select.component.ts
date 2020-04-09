import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('selectSelected') _selectSelected: ElementRef;
  @ViewChild('selectItems') _selectItems: ElementRef;

  @Output() onSelect = new EventEmitter<string>();
  
  @Input() items: Array<string>;

  private _valueChanges = new BehaviorSubject<string>("");
  public get valueChanges() {
    return this._valueChanges.asObservable();
  }

  private _isExpanded = false;

  private _selectedElement: HTMLElement;

  private _valueChangesSubscr: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.valueChanges.subscribe(
      (value: string) => {
        if (value) {
          this.onSelect.next(value);
        }
      }
    )
  }

  ngAfterViewInit():  void {
    this.setDefaultValue();
  }

  setDefaultValue() {
    const elem = this._selectSelected.nativeElement as HTMLElement;
    const elemItems = this._selectItems.nativeElement as HTMLElement;

    const options = elemItems.childNodes;
    if (options.length > 0) {
      this._selectedElement = options[0] as HTMLElement;
      const value = this._selectedElement.innerHTML;
      elem.innerHTML = value;
      this._selectedElement.classList.add("same-as-selected");

      this._valueChanges.next(value);
    }
  }

  toggle(): void {
    this._isExpanded = !this._isExpanded;

    const elem = this._selectSelected.nativeElement as HTMLElement;
    const elemItems = this._selectItems.nativeElement as HTMLElement;
    if (this._isExpanded) {
      elem.classList.add("select-arrow-active");
      elemItems.classList.remove("select-hide");
    } else {
      elem.classList.remove("select-arrow-active");
      elemItems.classList.add("select-hide");
    }
  }

  select($event: MouseEvent, value: string) {
    const elem = this._selectSelected.nativeElement as HTMLElement;
    elem.innerHTML = value;

    if (this._selectedElement) {
      this._selectedElement.classList.remove("same-as-selected");
    }
    this._selectedElement = $event.target as HTMLElement;
    this._selectedElement.classList.add("same-as-selected");

    this.toggle();

    this._valueChanges.next(value);
  }

  ngOnDestroy() {
    this._valueChangesSubscr.unsubscribe();
    this._valueChangesSubscr = null;

    this._selectedElement = null;
  }
}
