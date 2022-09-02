import { newSpecPage } from '@stencil/core/testing';
import { SegmentedButtonGroup } from './segmented-button-group';

describe('SegmentedButtonGroup', () => {
  it('should match standard snapshot', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup],
      html: `
      <scale-segmented-button-group>
      <scale-segmented-button><scale-icon-weather-cloudy slot="segmented-button-icon"></scale-icon-weather-cloudy></scale-segmented-button>
      <scale-segmented-button><scale-icon-action-favorite slot="segmented-button-icon"></scale-icon-weather-cloudy></scale-segmented-button>

      <scale-segmented-button><scale-icon-weather-rain slot="segmented-button-icon"></scale-icon-weather-rain></scale-segmented-button>
      <scale-segmented-button><scale-icon-weather-sunny slot="segmented-button-icon"></scale-icon-weather-sunny></scale-segmented-button>
      <scale-segmented-button><scale-icon-weather-heavy-snow slot="segmented-button-icon"></scale-icon-weather-heavy-snow></scale-segmented-button>
    </scale-segmented-button-group>   `,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should match multiselect snapshot', async () => {
    const page = await newSpecPage({
      components: [SegmentedButtonGroup],
      html: `
      <scale-segmented-button-group multi-select>
      <scale-segmented-button selected><scale-icon-weather-cloudy slot="segmented-button-icon"></scale-icon-weather-cloudy></scale-segmented-button>
      <scale-segmented-button selected><scale-icon-action-favorite slot="segmented-button-icon"></scale-icon-weather-cloudy></scale-segmented-button>

      <scale-segmented-button selected><scale-icon-weather-rain slot="segmented-button-icon"></scale-icon-weather-rain></scale-segmented-button>
      <scale-segmented-button><scale-icon-weather-sunny slot="segmented-button-icon"></scale-icon-weather-sunny></scale-segmented-button>
      <scale-segmented-button><scale-icon-weather-heavy-snow slot="segmented-button-icon"></scale-icon-weather-heavy-snow></scale-segmented-button>
    </scale-segmented-button-group>  
`,
    });
    expect(page.root).toMatchSnapshot();
  });
  //   it('should match error snapshot', async () => {
  //     const page = await newSpecPage({
  //       components: [RadioButtonGroup],
  //       html: `
  //       <scale-radio-button-group
  //         label="Radio Button Label"
  //         helper-text="Error message"
  //         invalid="true"
  //         >
  //         <div slot="radio-button-list">
  //         <scale-radio-button
  //           value="1"
  //           invalid="true"
  //           label="Radio Button"
  //           name="radioError"
  //           transparent="true"
  //           input-id="choiceOne"
  //         ></scale-radio-button>
  //         <div style="margin-top: 0.5rem"></div>
  //         <scale-radio-button
  //           value="2"
  //           invalid="true"
  //           label="Radio Button"
  //           name="radioError"
  //           input-id="choiceTwo"
  //         ></scale-radio-button>
  //         <div style="margin-top: 0.5rem"></div>
  //         <scale-radio-button
  //           value="3"
  //           invalid="true"
  //           label="Radio Button"
  //           name="radioError"
  //           input-id="choiceThree"
  //         ></scale-radio-button>
  //       </div>
  //     </scale-radio-button-group>`,
  //     });
  //     expect(page.root).toMatchSnapshot();
  //   });
});
