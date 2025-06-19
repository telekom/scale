import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButton } from './segmented-button';

describe('SegmentedButton', () => {
  it('should match standard snapshot', async () => {
    const page = await newSpecPage({
      components: [SegmentedButton],
      html: `
        <scale-segmented-button>
            <scale-segment>Label</scale-segment>
            <scale-segment>Label</scale-segment>
            <scale-segment>Label</scale-segment>
            <scale-segment>Label</scale-segment>
        </scale-segmented-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should include right properties', async () => {
    const page = await newSpecPage({
      components: [SegmentedButton],
      html: `
        <scale-segmented-button>
            <scale-segment>Label</scale-segment>
        </scale-segmented-button>`,
    });
    page.root.invalid = true;
    page.root.fullWidth = true;
    page.root.helperText = 'helpertext';
    page.root.disabled = true;
    page.root.multiSelect = true;
    page.root.size = 'medium';
    await page.waitForChanges();
    expect(page.rootInstance.invalid).toBe(true);
    expect(page.rootInstance.fullWidth).toBe(true);
    expect(page.rootInstance.helperText).toBe('helpertext');
    expect(page.rootInstance.disabled).toBe(true);
    expect(page.rootInstance.multiSelect).toBe(true);
    expect(page.rootInstance.size).toBe('medium');
  });
  it('should match selected button snapshot', async () => {
    const page = await newSpecPage({
      components: [SegmentedButton],
      html: `
        <scale-segmented-button>
            <scale-segment selected>Label</scale-segment>
            <scale-segment>Label</scale-segment>
        </scale-segmented-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
