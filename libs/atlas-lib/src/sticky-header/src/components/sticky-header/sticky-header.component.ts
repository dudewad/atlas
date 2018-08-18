import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BreakpointConfig } from '../../../../utils';

import { StickyHeaderItem } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'atl-sticky-header',
  styleUrls: ['./sticky-header.component.scss'],
  templateUrl: './sticky-header.component.html',
})
export class StickyHeaderComponent implements OnInit {
  @Input()
  public breakpointConfig: BreakpointConfig;
  @Input()
  public items: StickyHeaderItem[];
  public primaryItems: StickyHeaderItem[];
  public collapsedItems: StickyHeaderItem[];
  public collapseMenuActive = false;

  private destroy$ = new Subject<void>();

  public constructor(private breakpointObs: BreakpointObserver,
                     private cdr: ChangeDetectorRef){
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  /**
   * NgOnInit
   */
  public ngOnInit() {
    this.breakpointObs
      .observe(Object.keys(this.breakpointConfig)
        .map(key => this.breakpointConfig[key]))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onBreakpointChange());
  }

  public toggleCollapseMenu() {
    this.collapseMenuActive = !this.collapseMenuActive;
  }

  /**
   * Handler for primary menu item clicks
   * @param i The item that was clicked
   */
  public onPrimaryItemClick(i: StickyHeaderItem) {
    // ...
    console.log('primary item click', i.label);
  }

  /**
   * Handler for collapsed menu item clicks
   * @param i The item that was clicked
   */
  public onCollapseItemClick(i: StickyHeaderItem) {
    // ...
    console.log('collapsed item click', i.label);
  }

  private onBreakpointChange() {
    this.primaryItems = [];
    this.collapsedItems = [];

    for (let i = 0, len = this.items.length; i < len; i++) {
      const item = this.items[i];
      const breakpoint = this.breakpointConfig[item.showAt];

      if (breakpoint && this.breakpointObs.isMatched(breakpoint)) {
        this.primaryItems.push(item);
      } else {
        this.collapsedItems.push(item);
      }
    }

    this.cdr.markForCheck();
  }
}
