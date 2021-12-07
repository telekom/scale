describe('Table', () => {
  test.each([
    ['standard'],
    ['small'],
    ['with-sorting-icons'],
    ['with-striped-rows'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-table--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    await page.waitFor(5000);
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-table--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    await page.waitFor(5000);
    const previewHtml = await page.$('body');

    const row = await page.evaluateHandle(
      'document.querySelector("#sortable-table > tbody > tr:nth-child(3)")'
    );
    row.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
