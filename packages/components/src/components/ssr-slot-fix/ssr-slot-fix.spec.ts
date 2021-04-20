import { newSpecPage } from '@stencil/core/testing';
import { SsrSlotFix } from './ssr-slot-fix';

describe('SidebarNav', () => {
  let page: any;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [SsrSlotFix],
      html: `<scale-ssr-slot-fix></div>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
});
