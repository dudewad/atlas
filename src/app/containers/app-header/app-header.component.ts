import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  StickyHeaderItem,
  StickyHeaderItemActionType,
} from 'atlas-lib/sticky-header';

import { BpCfg } from 'app/utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  styleUrls: ['./app-header.component.scss'],
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  public bpCfg = BpCfg;
  // private destroy$ = new Subject<void>();

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
}
