import { newE2EPage } from '@stencil/core/testing';

describe('t-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-tag>this is a tag</t-tag>');
    const element = await page.find('t-tag');
    expect(element).toHaveClass('hydrated');
  });
});
