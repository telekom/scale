describe('ProgressBar', () => {
  test.each([['progress-with-description'], ['complete-error']])('%p', async variant => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-progress-bar--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    await page.waitFor(3000);
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
