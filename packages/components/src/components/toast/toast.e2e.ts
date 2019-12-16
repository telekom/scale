import { newE2EPage } from '@stencil/core/testing';

describe('t-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-toast>Toast message</t-toast>');
    const element = await page.find('t-toast');
    expect(element).toHaveClass('hydrated');
  });
});
