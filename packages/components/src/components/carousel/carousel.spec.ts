import { newSpecPage } from '@stencil/core/testing';
import { Carousel } from './carousel';

describe('Carousel', () => {
  let element;
  beforeEach(async () => {
    element = new Carousel();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Carousel],
      html: `<t-carousel>Label</t-carousel>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should set correct translate value when clicking arrow prev', () => {
    element.value = 0;
    element.slidesArray = [0, 1, 2, 3];
    element.handleSlideChange('prev');
    expect(element.value).toBe(-300);
  });

  it('should set correct translate value when clicking arrow next', () => {
    element.value = 100;
    element.slidesArray = [0, 1, 2, 3];
    element.handleSlideChange('next');
    expect(element.value).toBe(0);
  });

  it('should set correct active slide', () => {
    element.value = -300;
    element.setActiveSlide(2);
    expect(element.value).toBe(-200);
  });

  it('should set correct transform value based on the carousel container direction', () => {
    element.value = -300;
    element.vertical = true;
    element.setTransformValue();
    expect(element.setTransformValue()).toBe('translateY(-300%)');
  });

  it('should set correct transform value based on the carousel container direction', () => {
    element.value = -200;
    element.setTransformValue();
    expect(element.setTransformValue()).toBe('translateX(-200%)');
  });

  it('should set css active class', () => {
    element.value = -200;
    element.setActiveCssClass(2);
    expect(element.setActiveCssClass(2)).toBe('carousel__indicator--active');
  });
});
