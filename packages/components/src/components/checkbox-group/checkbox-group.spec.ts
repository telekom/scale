import { newSpecPage } from '@stencil/core/testing';
import { CheckboxGroup } from './checkbox-group';

describe('CheckboxGroup', () => {
  it('should match standard snapshot', async () => {
    const page = await newSpecPage({
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
    const element = page.root.querySelectorAll('scale-checkbox');
    element[1].removeAttribute('checked');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    element[1].setAttribute('checked', 'true');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should select all on master click', async () => {
    const page = await newSpecPage({
      components: [CheckboxGroup],
      html: `<scale-checkbox-group>
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
            checked="true"
            name="nameOfCheckbox"
          ></scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox 
            value="3" 
            name="nameOfCheckbox" 
            checked="true"
            >Checkbox Slot</scale-checkbox
          >
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="4"
            label="checkbox"
            name="nameOfCheckbox"
            disabled="true"
          ></scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="5"
            label="checkbox"
            name="nameOfCheckbox"
          ></scale-checkbox>
        </div>
      </div>
    </scale-checkbox-group>`,
    });
    expect(page.root).toMatchSnapshot();
    const element = page.root.querySelectorAll('scale-checkbox');
    // select all but disabled checkboxex
    element[0].setAttribute('checked', 'true');
    await page.waitForChanges();
    expect(element[1]).toHaveAttribute('checked');
    expect(element[2]).toHaveAttribute('checked');
    expect(element[3]).not.toHaveAttribute('checked');
    expect(page.root).toMatchSnapshot();
  });
  it('function chain', async () => {
    const page = await newSpecPage({
      components: [CheckboxGroup],
      html: `<scale-checkbox-group>
      <div slot="checkbox-header">
        <scale-checkbox
          input-id="header-checkbox"
          class="testing"
          value="1"
          label="checkbox"
          name="nameOfCheckbox"
          helper-text="helperText"
          disabled="true"
        >
        </scale-checkbox>
      </div>
      <div slot="checkbox-list">
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="2"
            label="checkbox"
            checked="true"
            name="nameOfCheckbox"
          ></scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox 
            value="3" 
            name="nameOfCheckbox" 
            checked="true"
            >Checkbox Slot</scale-checkbox
          >
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="4"
            label="checkbox"
            name="nameOfCheckbox"
            disabled="true"
          ></scale-checkbox>
        </div>
      </div>
    </scale-checkbox-group>`,
    });
    const newState = [
      {
        id: 'header-checkbox',
        checked: true,
        disabled: false,
        indeterminate: false,
      },
      {
        id: 'input-checkbox-1',
        checked: false,
        disabled: false,
        indeterminate: false,
      },
      {
        id: 'input-checkbox-2',
        checked: true,
        disabled: false,
        indeterminate: false,
      },
      {
        id: 'input-checkbox-3',
        checked: false,
        disabled: true,
        indeterminate: false,
      },
    ];
    page.rootInstance.createNewState();
    page.rootInstance.handleMasterDisableProp();
    page.rootInstance.distributeNewState(newState);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('function checkForMasterCheckboxChange', async () => {
    const page = await newSpecPage({
      components: [CheckboxGroup],
      html: `<scale-checkbox-group>
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
            checked="true"
            name="nameOfCheckbox"
          ></scale-checkbox>
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox 
            value="3" 
            name="nameOfCheckbox" 
            checked="true"
            >Checkbox Slot</scale-checkbox
          >
        </div>
        <div style="margin-top: 0.5rem">
          <scale-checkbox
            value="4"
            label="checkbox"
            name="nameOfCheckbox"
            disabled="true"
          ></scale-checkbox>
        </div>
      </div>
    </scale-checkbox-group>`,
    });
    const stateObj = [
      {
        id: 'header-checkbox',
        checked: true,
        disabled: false,
        indeterminate: false,
      },
      {
        id: 'input-checkbox-1',
        checked: false,
        disabled: false,
        indeterminate: false,
      },
      {
        id: 'input-checkbox-2',
        checked: true,
        disabled: false,
        indeterminate: false,
      },
      {
        id: 'input-checkbox-3',
        checked: false,
        disabled: true,
        indeterminate: false,
      },
    ];
    page.rootInstance.groupStatus = stateObj;
    page.rootInstance.checkForMasterCheckboxChange(stateObj);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
