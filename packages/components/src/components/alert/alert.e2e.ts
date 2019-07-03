import { newE2EPage } from '@stencil/core/testing';

describe('t-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-alert>Notification</t-alert>');
    const element = await page.find('t-alert');
    expect(element).toHaveClass('hydrated');
  });
});
