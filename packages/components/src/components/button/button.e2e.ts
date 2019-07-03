import { newE2EPage } from '@stencil/core/testing';

describe('t-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-button>Click me!</t-button>');
    const element = await page.find('t-button');
    expect(element).toHaveClass('hydrated');
  });
});
