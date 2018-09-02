import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import {
  StickyHeaderItem,
  StickyHeaderItemActionType,
} from 'atlas-lib/sticky-header';
import { BreakpointConfig, Dictionary } from 'atlas-lib/utils';

import { BpCfg } from 'app/utils';
import { Subject } from 'rxjs/index';

/**
 * These should be key/value where the value is the name of the svg icon string
 * to be passed to mat-icon (so they must be valid icon names!)
 * @type Dictionary<string>
 */
const logos: Dictionary<string> = {
  logoFull: 'logo-full',
  logoTypographic: 'logo-typographic',
  logoTypographicSmall: 'logo-typographic-small',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  styleUrls: ['./app-header.component.scss'],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent implements OnDestroy, OnInit {
  public logoIcon: string = logos.logoFull;

  private destroy$ = new Subject<void>();

  public menuItems: StickyHeaderItem[] = [
    {
      label: 'Shop',
      showAt: 'mdMin', action: {
        action: StickyHeaderItemActionType.openRichContentItem,
        target: 'shop',
      },
    },
    {
      label: 'Why Stand',
      showAt: 'mdMin', action: {
        action: StickyHeaderItemActionType.openRichContentItem,
        target: 'whyStand',
      },
    },
    {
      label: 'Premium Hardwoods',
      showAt: 'mdMin', action: {
        action: StickyHeaderItemActionType.openRichContentItem,
        target: 'premiumHardwoods',
      },
    },
    {
      label: 'Master Craftsmen',
      showAt: 'lgMin', action: {
        action: StickyHeaderItemActionType.openRichContentItem,
        target: 'masterCraftsmen',
      },
    },
    {
      label: 'Sustainability',
      showAt: 'lgMin', action: {
        action: StickyHeaderItemActionType.openRichContentItem,
        target: 'sustainability',
      },
    },
    {
      label: 'Atlas Desk',
      showAt: 'mdMin', action: {
        action: StickyHeaderItemActionType.openRichContentItem,
        target: 'atlasDesk',
      },
    },
  ];
  public bpCfg: BreakpointConfig = BpCfg;

  public constructor(private breakpointObs: BreakpointObserver,
                     private cdr: ChangeDetectorRef) {
  }

  /**
   * NgOnDestroy Interface Method
   */
  public ngOnDestroy() {
    this.destroy$.next();
  }

  /**
   * NgOnInit
   */
  public ngOnInit() {
    this.breakpointObs
    .observe([BpCfg.lgMin, BpCfg.mdMin])
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.onBreakpointChange());
  }

  private onBreakpointChange() {
    if (this.breakpointObs.isMatched(BpCfg.lgMin)) {
      this.logoIcon = logos.logoFull;
    } else if (this.breakpointObs.isMatched(BpCfg.mdMin)) {
      this.logoIcon = logos.logoTypographic;
    } else {
      this.logoIcon = logos.logoTypographicSmall;
    }

    this.cdr.markForCheck();
  }
}
