import { newE2EPage } from '@stencil/core/testing';

describe('scale-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-button>Click me!</scale-button>');
    const element = await page.find('scale-button');
    expect(element).toHaveClass('hydrated');
  });
});
