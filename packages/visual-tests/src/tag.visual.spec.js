describe('Tag', () => {
  test.each([
    ['standard'],
    ['a-dissmisable-tag'],
    ['a-small-tag'],
    ['a-small-dismissable-tag'],
    ['disabled-dismissable-tag'],
    ['variant-secondary-tag'],
    ['variant-secondary-link'],
    ['variant-secondary-dismissable'],
    ['variant-secondary-small'],
    ['variant-secondary-dismissable-small'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-tag--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
