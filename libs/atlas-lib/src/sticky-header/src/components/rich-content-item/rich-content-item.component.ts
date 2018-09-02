import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'atl-rich-content-item',
  templateUrl: './rich-content-item.component.html',
})
export class RichContentItemComponent {
  @Input()
  public name: string;

  private _active = false;

  public constructor(private cdr: ChangeDetectorRef) {
  }

  public get active() {
    return this._active;
  }

  @HostBinding('class.active')
  public set active(active: boolean) {
    this._active = active;
    this.cdr.markForCheck();
  }
}
