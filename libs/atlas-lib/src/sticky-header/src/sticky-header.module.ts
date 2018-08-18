import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StickyHeaderComponent } from './components/index';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  declarations: [StickyHeaderComponent],
  exports: [StickyHeaderComponent],
})
export class StickyHeaderModule { }
