describe('DataGrid', () => {
  test.each([
    ['checkbox-cell'],
    ['date-cell'],
    ['html-cell'],
    ['link-cell'],
    ['number-cell'],
    ['select-cell'],
    ['text-cell'],
    ['heading'],
    ['hide-extras'],
    ['pagination'],
    ['column-stretch'],
    ['tags-cell'],
    ['selection-export'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-data-grid--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    await page.waitFor(1000);
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
