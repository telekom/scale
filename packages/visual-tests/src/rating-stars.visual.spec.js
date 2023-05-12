describe('RatingStars', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-rating-stars--standard', mode);
    });
    test.each([
      ['info-text-and-custom-label'],
      ['disabled'],
      ['small-with-info-text'],
      ['hidden-label'],
      ['readonly'],
    ])('story %p', async (variant) => {
      await global.runSetup(`components-rating-stars--${variant}`);
      await global.visualCheck();
    });
    test.each([['info-text-and-custom-label']])(
      'active %p',
      async (variant) => {
        await global.runSetup(`components-rating-stars--${variant}`);
        const input = await global.page.evaluateHandle(
          `document.querySelector("#root > scale-rating-stars").shadowRoot.querySelector("input[type=range]")`
        );
        await global.page.mouse.move(40, 60);
        await global.page.mouse.down();
        await global.page.waitFor(600);
        await global.visualCheck();
      }
    );
  });
});
