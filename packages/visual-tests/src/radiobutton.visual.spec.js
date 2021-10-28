describe('RadioButton', () => {
  test.each([
    ['standard'],
    ['standard-disabled'],
    ['selected'],
    ['selected-disabled'],
    ['helper-text'],
    ['error'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-radio-button--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
// hover, active, focus
test.each([['standard'], ['selected']])('%p', async (variant) => {
  await global.page.goto(
    `http://host.docker.internal:3123/iframe.html?id=components-radio-button--${variant}&viewMode=story`
  );

  await page.waitForSelector('html.hydrated');
  const previewHtml = await page.$('body');

  await page.evaluate(() => {
    const transitions = [
      '--scl-motion-duration-immediate',
      '--scl-motion-duration-fast',
      '--scl-motion-duration-slower',
      '--scl-motion-duration-deliberate',
    ];

    transitions.forEach((transitionSpeed) => {
      document.body.style.setProperty(transitionSpeed, '0s');
    });
  });

  const radioButtonWrapper = await page.evaluateHandle(
    `document.querySelector("#root > scale-radio-button > div")`
  );
  const radioButton = await page.evaluateHandle(
    `document.querySelector("#root > scale-radio-button > div > input")`
  );

  radioButton.focus();
  expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  radioButtonWrapper.hover();
  expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  await page.mouse.move(20, 20);
  await page.mouse.down();
  expect(await previewHtml.screenshot()).toMatchImageSnapshot();
});
