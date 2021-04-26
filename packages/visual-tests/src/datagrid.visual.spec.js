describe('DataGrid', () => {
  test.each([
    ['standard'],
    ['checkbox-cell'],
    ['date-cell'],
    ['html-cell'],
    ['link-cell'],
    ['number-cell'],
    ['select-cell'],
    ['tags-cell'],
    ['text-cell'],
    ['freeze-header'],
    ['heading'],
    ['hide-extras'],
    ['numbered'],
    ['pagination'],
    ['selection-export'],
    ['menu-slot'],
    ['column-stretch'],
    ['show-more'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-data-grid--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    await page.waitFor(2000);
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
