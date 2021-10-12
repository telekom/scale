describe('Menu', () => {
  test.each([['menu-item-options']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-flyout-menu--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
// open menu on click
test.each([['direction']])('%p', async (variant) => {
  await global.page.goto(
    `http://host.docker.internal:3123/iframe.html?id=beta-components-flyout-menu--${variant}&viewMode=story`
  );
  await page.waitForSelector('html.hydrated');
  const previewHtml = await page.$('body');

  const directions = [
    'right',
    'left',
    'top-right',
    'top-left',
    'bottom-left',
    'bottom-right',
  ];
  for (const direction of directions) {
    const dir = await page.evaluateHandle(
      `document.querySelector("#root content > scale-menu-flyout[direction=${direction}] > scale-button").shadowRoot.querySelector(".button")`
    );
    const base = await page.evaluateHandle(`document.querySelector("#root")`);
    dir.click();
    await page.waitFor(500);
    await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    // await page.mouse.move(0, 300);
    await base.click();
  }
});
