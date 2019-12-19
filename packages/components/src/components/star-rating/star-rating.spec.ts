import { newSpecPage } from '@stencil/core/testing';
import { StarRating } from './star-rating';

describe('StarRating', () => {
  let element;
  beforeEach(async () => {
    element = new StarRating();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [StarRating],
      html: `<t-star-rating>/t-star-rating>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have class disabled', () => {
    element.disabled = true;
    expect(element.getCssClassMap()).toContain('switch--disabled');
  });
});
