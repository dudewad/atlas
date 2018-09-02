import { StickyHeaderItemActionType } from './sticky-header-item-action-type';

export interface StickyHeaderItemAction {
  action: StickyHeaderItemActionType;
  target: string;
}
