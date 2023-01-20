import { newSpecPage } from '@stencil/core/testing';
import { Segment } from './segment';

describe('Segment', () => {
  it('should match standard snapshot', async () => {
    const page = await newSpecPage({
      components: [Segment],
      html: `
        <scale-segment>Label</scale-segment>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should include right properties', async () => {
    const page = await newSpecPage({
      components: [Segment],
      html: `
            <scale-segment>Label</scale-segment>`,
    });
    page.root.disabled = true;
    (page.root.size = 'medium'), (page.root.selected = true);
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
    expect(page.rootInstance.ariaDescriptionTranslation).toBe(
      'ariaDescriptionTranslation'
    );
  });
  it('should include iconOnly', async () => {
    const page = await newSpecPage({
      components: [Segment],
      html: `
            <scale-segment>Label</scale-segment>`,
    });
    page.root.iconOnly = true;
    await page.waitForChanges();
    expect(page.rootInstance.iconOnly).toBe(true);
  });
  it('should include textOnly', async () => {
    const page = await newSpecPage({
      components: [Segment],
      html: `
            <scale-segment>Label</scale-segment>`,
    });
    page.root.textOnly = true;
    await page.waitForChanges();
    expect(page.rootInstance.textOnly).toBe(true);
  });
});
