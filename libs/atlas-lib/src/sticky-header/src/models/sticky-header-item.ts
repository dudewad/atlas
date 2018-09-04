import { StickyHeaderItemAction } from './sticky-header-item-action';

export interface StickyHeaderItem {
  /**
   * The visible lable for the item on screen
   */
  label: string;
  /**
   * The breakpoint minimum at which the item will appear in the menu, and
   * below which it will be put into the collapsed menu. Must be a valid key
   * from the breakpoint config for the current running application. No value
   * means it will always show
   */
  showAt?: string;
  action: StickyHeaderItemAction;
}
