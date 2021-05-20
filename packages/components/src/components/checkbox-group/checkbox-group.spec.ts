import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { CheckboxGroup } from './checkbox-group';

describe('CheckboxGroup', () => {
  let page: SpecPage;

  it('should match standard snapshot', async () => {
    page = await newSpecPage({
      components: [CheckboxGroup],
      html: ` <scale-checkbox-group>
      <div slot="checkbox-header">
        <scale-checkbox
          input-id="header-checkbox"
          class="testing"
          value="1"
          label="checkbox"
          name="nameOfCheckbox"
          helper-text="helperText"
        >
        </scale-checkbox>
      </div>
      <div slot="checkbox-list">
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="2"
            label="checkbox"
            checked
            name="nameOfCheckbox"
          ></scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox value="3" name="nameOfCheckbox" checked
            >Checkbox Slot</scale-checkbox
          >
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="3"
            label="checkbox"
            name="nameOfCheckbox"
            disabled
          ></scale-checkbox>
        </div>
      </div>
    </scale-checkbox-group>`,
    });
    let element = page.root.querySelectorAll('scale-checkbox');
    element[1].removeAttribute('checked');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    element[1].setAttribute('checked', 'true');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
