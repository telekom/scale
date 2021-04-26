describe('DataGrid', () => {
  test.each([
    ['checkbox-cell'],
    ['date-cell'],
    ['html-cell'],
    ['link-cell'],
    ['number-cell'],
    ['select-cell'],
    ['tags-cell'],
    ['text-cell'],
    ['heading'],
    ['hide-extras'],
    ['pagination'],
    ['selection-export'],
    ['column-stretch'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-data-grid--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    await page.waitFor(3000);
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
