import { newSpecPage } from '@stencil/core/testing';
import { BrandHeader } from '../brand-header';

describe('brand-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BrandHeader],
      html: `<brand-header></brand-header>`,
    });
    expect(page.root).toEqualHtml(`
      <brand-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </brand-header>
    `);
  });
});
