import { StickyHeaderModule } from './sticky-header.module';

describe('StickyHeaderModule', () => {
  let stickyHeaderModule: StickyHeaderModule;

  beforeEach(() => {
    stickyHeaderModule = new StickyHeaderModule();
  });

  it('should create an instance', () => {
    expect(stickyHeaderModule).toBeTruthy();
  });
});
