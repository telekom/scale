import { newE2EPage } from '@stencil/core/testing';

describe('t-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-badge>Click me!</t-badge>');
    const element = await page.find('t-badge');
    expect(element).toHaveClass('hydrated');
  });
});
