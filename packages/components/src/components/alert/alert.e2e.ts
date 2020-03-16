import { newE2EPage } from '@stencil/core/testing';

describe('scale-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-alert>Notification</scale-alert>');
    const element = await page.find('scale-alert');
    expect(element).toHaveClass('hydrated');
  });
});
