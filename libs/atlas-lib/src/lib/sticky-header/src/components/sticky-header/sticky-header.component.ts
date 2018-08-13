import { Component, Input } from '@angular/core';
import { StickyHeaderItem } from '../../models';

@Component({
  selector: 'atl-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.scss'],
})
export class StickyHeaderComponent {
  @Input()
  public items: StickyHeaderItem[];

  public onItemClick(i: StickyHeaderItem) {
    //
  }
}
