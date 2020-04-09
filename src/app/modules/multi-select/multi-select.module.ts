import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from 'src/app/components/multi-select/multi-select.component';

@NgModule({
  declarations: [
    MultiSelectComponent
  ],
  exports: [
    MultiSelectComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MultiSelectModule { }
