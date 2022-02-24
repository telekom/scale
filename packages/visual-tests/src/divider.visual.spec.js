describe('Divider', () => {
  test.each([['standard'], ['vertical']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-divider--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    await page.evaluate(() => {
      [
        '--telekom-motion-duration-immediate',
        '--telekom-motion-duration-transition',
        '--telekom-motion-duration-animation',
        '--telekom-motion-duration-animation-deliberate',
      ].forEach((transitionSpeed) => {
        document.body.style.setProperty(transitionSpeed, '0s');
      });
    });
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
