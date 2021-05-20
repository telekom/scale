import { newSpecPage } from '@stencil/core/testing';
import { RadioButtonGroup } from './radio-button-group';

describe('SidebarNavItem', () => {
  it('should match error snapshot', async () => {
    const page = await newSpecPage({
      components: [RadioButtonGroup],
      html: `
      <scale-radio-button-group
        label="Radio Button Label"
        helper-text="Error message"
        >
        <div slot="radio-button-list">
        <scale-radio-button
          value="1"
          status="error"
          label="Radio Button"
          name="radioError"
          transparent="true"
          input-id="choiceOne"
        ></scale-radio-button>
        <div style="margin-top: 0.5rem"></div>
        <scale-radio-button
          value="2"
          status="error"
          label="Radio Button"
          name="radioError"
          input-id="choiceTwo"
        ></scale-radio-button>
        <div style="margin-top: 0.5rem"></div>
        <scale-radio-button
          value="3"
          status="error"
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
