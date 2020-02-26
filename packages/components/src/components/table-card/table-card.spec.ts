import { newSpecPage } from '@stencil/core/testing';
import { TableCard } from './table-card';

describe('TableCard', () => {
  let element;
  beforeEach(async () => {
    element = new TableCard();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [TableCard],
      html: `<t-table-card>Label</t-table-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle a custom css class', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('table-card--theme-default');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toContain('table-card');
  });
});
