import { newSpecPage } from '@stencil/core/testing';
import { Rating } from './rating';

describe('Rating', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Rating],
      html: `<t-rating>/t-rating>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
