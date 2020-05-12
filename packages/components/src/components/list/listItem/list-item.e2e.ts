import { newE2EPage } from '@stencil/core/testing';

describe('scale-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-list-item>default</scale-list-item>');
    const element = await page.find('scale-list-item');
    expect(element).toHaveClass('hydrated');
  });
});
