import { newE2EPage } from '@stencil/core/testing';

describe('t-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-divider/>');
    const element = await page.find('t-divider');
    expect(element).toHaveClass('hydrated');
  });
});
