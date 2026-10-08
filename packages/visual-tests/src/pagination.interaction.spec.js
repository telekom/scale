const { test, expect } = require('./test-fixtures');

test('next page changes the displayed range and emits its event @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-pagination--standard');
  const component = page.locator('scale-pagination');
  const pageRange = component.locator('.pagination__info');
  const nextButton = component.getByRole('button', {
    name: 'Go to next page',
  });
  const paginationEvent = component.evaluate(
    (element) =>
      new Promise((resolve) => {
        element.addEventListener(
          'scale-pagination',
          ({ detail }) => resolve(detail),
          { once: true }
        );
      })
  );

  await nextButton.click();

  await expect(pageRange).toHaveText('111-120 / 200');
  await expect(paginationEvent).resolves.toEqual({
    direction: 'NEXT',
    startElement: 110,
  });
});

test('previous page responds to Enter and emits its event @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-pagination--standard');
  const component = page.locator('scale-pagination');
  const pageRange = component.locator('.pagination__info');
  const nextButton = component.getByRole('button', {
    name: 'Go to next page',
  });
  const previousButton = component.getByRole('button', {
    name: 'Go to previous page',
  });

  await nextButton.click();
  await expect(pageRange).toHaveText('111-120 / 200');
  const paginationEvent = component.evaluate(
    (element) =>
      new Promise((resolve) => {
        element.addEventListener(
          'scale-pagination',
          ({ detail }) => resolve(detail),
          { once: true }
        );
      })
  );

  await previousButton.focus();
  await page.keyboard.press('Enter');

  await expect(pageRange).toHaveText('101-110 / 200');
  await expect(paginationEvent).resolves.toEqual({
    direction: 'PREVIOUS',
    startElement: 100,
  });
});
