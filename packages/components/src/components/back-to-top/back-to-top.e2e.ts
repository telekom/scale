import { newE2EPage } from '@stencil/core/testing';

describe('t-back-to-top', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-back-to-top/>');
    const element = await page.find('t-back-to-top');
    expect(element).toHaveClass('hydrated');
  });
});
