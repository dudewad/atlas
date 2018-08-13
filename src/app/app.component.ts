import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Dictionary, StickyHeaderItem } from 'atlas-lib';

import { BpCfg } from 'app/utils';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public logoIcon: string = logos.logoFull;
  public menuItems: StickyHeaderItem[] = [
    { label: 'Shop' },
    { label: 'Why Standing Desks' },
    { label: 'Premium Hardwoods' },
    { label: 'Our Master Craftsmen' },
    { label: 'Sustainability' },
    { label: 'Atlas Desk' },
  ];

  private destroy$ = new Subject<void>();

  public constructor(private breakpointObs: BreakpointObserver,
                     private cdr: ChangeDetectorRef,
                     private iconRegistry: MatIconRegistry,
                     private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/svgs.svg'),
    );
  }

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
      console.log('Matched BpCfg.lgMin', BpCfg.lgMin);
      this.logoIcon = logos.logoFull;
    } else if (this.breakpointObs.isMatched(BpCfg.mdMin)) {
      console.log('Matched BpCfg.mdMin', BpCfg.mdMin);
      this.logoIcon = logos.logoTypographic;
    } else {
      console.log('Matched None');
      this.logoIcon = logos.logoTypographicSmall;
    }

    this.cdr.markForCheck();
  }
}
