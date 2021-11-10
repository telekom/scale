import { newSpecPage } from '@stencil/core/testing';
import { RadioButtonGroup } from './radio-button-group';

describe('RadioButtonGroup', () => {
  it('should match standard snapshot', async () => {
    const page = await newSpecPage({
      components: [RadioButtonGroup],
      html: `
              <scale-radio-button-group label="Radio Button Label">
              <div slot="radio-button-list">
                <scale-radio-button
                  value="1"
                  label="Radio Button"
                  name="radioSelect"
                  transparent="true"
                  input-id="choiceOne"
                ></scale-radio-button>
                <div style="margin-top: 0.5rem"></div>
                <scale-radio-button
                  value="2"
                  label="Radio Button"
                  name="radioSelect"
                  input-id="choiceTwo"
                ></scale-radio-button>
                <div style="margin-top: 0.5rem"></div>
                <scale-radio-button
                  value="3"
                  label="Radio Button"
                  name="radioSelect"
                  input-id="choiceThree"
                ></scale-radio-button>
              </div>
            </scale-radio-button-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should match selected snapshot', async () => {
    const page = await newSpecPage({
      components: [RadioButtonGroup],
      html: `
      <scale-radio-button-group label="Radio Button Label">
      <div slot="radio-button-list">
        <scale-radio-button
          value="1"
          label="Radio Button"
          name="radioSelectedOne"
          transparent="true"
          checked
          input-id="choiceOne"
        ></scale-radio-button>
        <div style="margin-top: 0.5rem"></div>
        <scale-radio-button
          value="2"
          label="Radio Button"
          name="radioSelectedTwo"
          input-id="choiceTwo"
        ></scale-radio-button>
        <div style="margin-top: 0.5rem"></div>
        <scale-radio-button
          value="3"
          label="Radio Button"
          name="radioSelectedThree"
          input-id="choiceThree"
        ></scale-radio-button>
      </div>
    </scale-radio-button-group>
`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should match error snapshot', async () => {
    const page = await newSpecPage({
      components: [RadioButtonGroup],
      html: `
      <scale-radio-button-group
        label="Radio Button Label"
        helper-text="Error message"
        invalid="true"
        >
        <div slot="radio-button-list">
        <scale-radio-button
          value="1"
          invalid="true"
          label="Radio Button"
          name="radioError"
          transparent="true"
          input-id="choiceOne"
        ></scale-radio-button>
        <div style="margin-top: 0.5rem"></div>
        <scale-radio-button
          value="2"
          invalid="true"
          label="Radio Button"
          name="radioError"
          input-id="choiceTwo"
        ></scale-radio-button>
        <div style="margin-top: 0.5rem"></div>
        <scale-radio-button
          value="3"
          invalid="true"
          label="Radio Button"
          name="radioError"
          input-id="choiceThree"
        ></scale-radio-button>
      </div>
    </scale-radio-button-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
