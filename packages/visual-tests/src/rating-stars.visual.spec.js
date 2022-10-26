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
    // focus, active
    test.each([['info-text-and-custom-label']])('focus %p', async (variant) => {
      await global.runSetup(`components-rating-stars--${variant}`);
      const input = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-rating-stars").shadowRoot.querySelector("input[type=range]")`
      );
      await input.focus();
      await global.visualCheck();
    });
  });
});
