import { newE2EPage } from '@stencil/core/testing';

describe('scale-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-list>default</scale-list>');
    const element = await page.find('scale-list');
    expect(element).toHaveClass('hydrated');
  });
});
