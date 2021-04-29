import { newSpecPage } from "@stencil/core/testing";
import { TabPanel } from "./tab-panel";

describe('TabPanel', () => {
    let page;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [TabPanel],
        html: `<scale-tab-panel></scale-tab-panel>`,
      });
    });
    it('should match snapshot', async () => {
      expect(page.root).toMatchSnapshot();
    });
    it('should handle styles', async()=>{
        page.rootInstance.styles = 'background-color:red'
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot();
    })
    it('should handle css classes', async()=>{
        const tabPanel = new TabPanel()
        tabPanel.small = true
        expect(tabPanel.getCssClassMap()).toBe('tab-panel tab-panel--small')
        tabPanel.small = false
        expect(tabPanel.getCssClassMap()).toBe('tab-panel')
    })
});