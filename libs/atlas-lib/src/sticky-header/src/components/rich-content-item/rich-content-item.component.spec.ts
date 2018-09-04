import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichContentItemComponent } from './rich-content-item.component';

describe('RichContentItemComponent', () => {
  let component: RichContentItemComponent;
  let fixture: ComponentFixture<RichContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichContentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
