import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomPanelComponent } from 'src/app/components/bottom-panel/bottom-panel.component';
import { PaginatorModule } from '../paginator/paginator.module';

@NgModule({
  declarations: [
    BottomPanelComponent
  ],
  exports: [
    BottomPanelComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
  ]
})
export class BottomPanelModule { }
