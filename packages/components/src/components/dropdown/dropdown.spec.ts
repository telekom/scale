import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Dropdown } from './dropdown';

describe('Dropdown', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [Dropdown],
      html: `
        <scale-dropdown label="select">
  <option value="1">item 1</option>
  <option value="2" selected>item 2</option>
  <option value="3">item 3</option>
</scale-dropdown>
`,
    });
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should emit on change', async () => {
    const changeSpy = jest.fn();
    const changeSpyLegacy = jest.fn();
    page.doc.addEventListener('scale-change', changeSpy);
    page.doc.addEventListener('scaleChange', changeSpyLegacy);
    const element = page.root.querySelector('input');
    element.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
    expect(changeSpyLegacy).toHaveBeenCalled();
  });
});
