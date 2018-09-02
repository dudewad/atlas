import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { GlobalEventsService } from '../../../../global-events';
import { BreakpointConfig } from '../../../../utils';
import { StickyHeaderItem, StickyHeaderItemActionType } from '../../models';
import { RichContentItemComponent } from '../rich-content-item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'atl-sticky-header',
  styleUrls: ['./sticky-header.component.scss'],
  templateUrl: './sticky-header.component.html',
})
export class StickyHeaderComponent implements OnDestroy, OnInit {
  @Input()
  public activeIndicator: string;
  @Input()
  public breakpointConfig: BreakpointConfig;
  @Input()
  public items: StickyHeaderItem[];
  public primaryItems: StickyHeaderItem[];
  public collapsedItems: StickyHeaderItem[];
  public collapseMenuActive = false;
  @HostBinding('class.sticking')
  public isSticking = false;
  @HostBinding('class.richContentItemOpen')
  public selectedMenuItem: StickyHeaderItem;
  @HostBinding('class.has-placeholder')
  @Input()
  public usePlaceholder = false;

  private destroy$ = new Subject<void>();
  private docEl: HTMLElement;
  @ViewChild('content')
  private contentElRef: ElementRef;
  @ViewChild('placeholder')
  private placeholderElRef: ElementRef;
  @ViewChild('richMenuContent')
  private richMenuContentElRef: ElementRef;
  @ContentChildren(RichContentItemComponent, { descendants: true })
  private richContentItems: QueryList<RichContentItemComponent>;

  public constructor(private breakpointObs: BreakpointObserver,
                     private globalEvts: GlobalEventsService,
                     private cdr: ChangeDetectorRef) {
  }

  /**
   * NgOnDestroy Interface Method
   */
  public ngOnDestroy() {
    this.destroy$.complete();
  }

  /**
   * NgOnInit Interface Method
   */
  public ngOnInit() {
    this.docEl = document.documentElement;

    this.breakpointObs
      .observe(Object.keys(this.breakpointConfig)
        .map(key => this.breakpointConfig[key]))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onBreakpointChange());

    this.globalEvts.onScroll
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onScroll());
  }

  public toggleCollapseMenu() {
    this.collapseMenuActive = !this.collapseMenuActive;
  }

  /**
   * Handler for primary menu item clicks
   * @param i The item that was clicked
   */
  public onPrimaryItemClick(i: StickyHeaderItem) {
    const action = i.action;
    this.selectedMenuItem = i;

    switch (action.action) {
      case StickyHeaderItemActionType.navigate: {
        break;
      }
      case StickyHeaderItemActionType.openRichContentItem: {
        const rci = this.richContentItems.find(item =>
          item.name === action.target);

        this.richContentItems.forEach(item => {
          if (item !== rci && item.active) {
            item.active = false;
          }
        });

        if (rci && !rci.active) {
          rci.active = true;

          // Clear vm cycle to let current event finish bubbling
          setTimeout(() => {
            this.globalEvts.click
            .pipe(
              filter(evt => !this.richMenuContentElRef
                .nativeElement.contains(evt.target),
              ),
              take(1),
            )
            .subscribe(() => {
              if (rci) {
                rci.active = false;
                this.selectedMenuItem = this.selectedMenuItem !== i
                  ? this.selectedMenuItem
                  : undefined;
                this.cdr.markForCheck();
              }
            });
          });
        }

        break;
      }
    }
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
    this.updatePlaceholder();

    this.cdr.markForCheck();
  }

  private onScroll() {
    if (this.isSticking !== this.docEl.scrollTop > 0) {
      this.isSticking = this.docEl.scrollTop > 0;
      this.updatePlaceholder();
      this.cdr.markForCheck();
    }
  }

  private updatePlaceholder() {
    if (!this.usePlaceholder) {
      return;
    }

    const contentRect = this.contentElRef.nativeElement.getBoundingClientRect();
    const placeholder = this.placeholderElRef.nativeElement;

    if (placeholder.clientHeight !== contentRect.height) {
      placeholder.style.height = contentRect.height + 'px';
      this.cdr.markForCheck();
    }
  }
}
