import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButton } from './segmented-button';

describe('SegmentedButton', () => {
  it('should match standard snapshot', async () => {
    const page = await newSpecPage({
      components: [SegmentedButton],
      html: `
        <scale-segmented-button>Label</scale-segmented-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should include right properties', async () => {
    const page = await newSpecPage({
      components: [SegmentedButton],
      html: `
            <scale-segmented-button>Label</scale-segmented-button>`,
    });
    page.root.disabled = true;
    page.root.size = 'medium',
    page.root.selected = true;
    page.root.hasIcon = true;
    page.root.ariaLangSelected = 'ariaLangSelected';
    page.root.ariaLangDeselected = 'ariaLangDeselected';
    page.root.ariaDescriptionTranslation = 'ariaDescriptionTranslation';
    await page.waitForChanges();
    expect(page.rootInstance.disabled).toBe(true);
    expect(page.rootInstance.size).toBe('medium');
    expect(page.rootInstance.selected).toBe(true);
    expect(page.rootInstance.hasIcon).toBe(true);
    expect(page.rootInstance.ariaLangSelected).toBe('ariaLangSelected');
    expect(page.rootInstance.ariaLangDeselected).toBe('ariaLangDeselected');
    expect(page.rootInstance.ariaDescriptionTranslation).toBe('ariaDescriptionTranslation');
});
it('should include iconOnly', async () => {
    const page = await newSpecPage({
      components: [SegmentedButton],
      html: `
            <scale-segmented-button>Label</scale-segmented-button>`,
    });
    page.root.iconOnly = true;
   await page.waitForChanges();
    expect(page.rootInstance.iconOnly).toBe(true);
});
it('should include textOnly', async () => {
    const page = await newSpecPage({
      components: [SegmentedButton],
      html: `
            <scale-segmented-button>Label</scale-segmented-button>`,
    });
    page.root.textOnly = true;
   await page.waitForChanges();
    expect(page.rootInstance.textOnly).toBe(true);
});
});
