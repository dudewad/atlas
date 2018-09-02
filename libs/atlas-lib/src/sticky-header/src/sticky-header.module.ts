import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalEventsModule } from '../../global-events';
import { RichContentItemComponent, StickyHeaderComponent } from './components';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    GlobalEventsModule,
    MatIconModule,
  ],
  declarations: [RichContentItemComponent, StickyHeaderComponent],
  exports: [RichContentItemComponent, StickyHeaderComponent],
})
export class StickyHeaderModule { }
