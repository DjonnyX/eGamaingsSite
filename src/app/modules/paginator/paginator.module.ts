import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { SelectModule } from '../select/select.module';

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    SelectModule
  ]
})
export class PaginatorModule { }
