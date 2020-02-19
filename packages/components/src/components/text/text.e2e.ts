import { newE2EPage } from '@stencil/core/testing';

describe('t-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-text>this is a tag</t-text>');
    const element = await page.find('t-text');
    expect(element).toHaveClass('hydrated');
  });
});
