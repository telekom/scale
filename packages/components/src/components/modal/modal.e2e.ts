import { newE2EPage } from '@stencil/core/testing';

describe('scale-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-modal>Notification</scale-modal>');
    const element = await page.find('scale-modal');
    expect(element).toHaveClass('hydrated');
  });
});
