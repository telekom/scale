import { newE2EPage } from '@stencil/core/testing';

describe('t-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-link>default</t-link>');
    const element = await page.find('t-link');
    expect(element).toHaveClass('hydrated');
  });
});
