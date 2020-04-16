import { newE2EPage } from '@stencil/core/testing';

describe('scale-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-tag>Click me!</scale-tag>');
    const element = await page.find('scale-tag');
    expect(element).toHaveClass('hydrated');
  });
});
