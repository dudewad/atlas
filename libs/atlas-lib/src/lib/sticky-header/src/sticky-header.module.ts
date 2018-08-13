import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyHeaderComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [StickyHeaderComponent],
  exports: [StickyHeaderComponent],
})
export class StickyHeaderModule { }
