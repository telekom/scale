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
            value="4"
            label="checkbox"
            name="nameOfCheckbox"
            disabled
          ></scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="5"
            label="checkbox"
            name="nameOfCheckbox"
            checked
          >
          </scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="6"
            label="checkbox"
            name="nameOfCheckbox"
            checked
          >
          </scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="7"
            label="checkbox"
            name="nameOfCheckbox"
            checked
          >
          </scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="8"
            label="checkbox"
            name="nameOfCheckbox"
            checked
          >
          </scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="9"
            label="checkbox"
            name="nameOfCheckbox"
            disabled
            checked
          >
          </scale-checkbox>
        </div>
      </div>
    </scale-checkbox-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
