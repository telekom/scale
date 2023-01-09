import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './segmented-button-group';

describe('SegmentedButtonGroup', () => {
  it('should match standard snapshot', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup],
      html: `
        <scale-segmented-button-group>
            <scale-segmented-button>Label</scale-segmented-button>
            <scale-segmented-button>Label</scale-segmented-button>
            <scale-segmented-button>Label</scale-segmented-button>
            <scale-segmented-button>Label</scale-segmented-button>
        </scale-segmented-button-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should include right properties', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup],
      html: `
        <scale-segmented-button-group>
            <scale-segmented-button>Label</scale-segmented-button>
        </scale-segmented-button-group>`,
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
      components: [SegmentedButtonGroup],
      html: `
        <scale-segmented-button-group>
            <scale-segmented-button selected>Label</scale-segmented-button>
            <scale-segmented-button selected>Label</scale-segmented-button>
        </scale-segmented-button-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});