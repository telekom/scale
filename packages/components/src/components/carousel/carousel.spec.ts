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

  it('should calculate slides number into an array', () => {
    element.slidesArray = [];
    element.totalSlides = 4;
    element.componentWillLoad();
    expect(element.slidesArray.length).toBe(4);
  });

  it('should set correct translate value when clicking arrow left', () => {
    element.value = 0;
    element.slidesArray = [0, 1, 2, 3];
    element.displayNext('left');
    expect(element.value).toBe(-300);
  });

  it('should set correct translate value when clicking arrow left', () => {
    element.value = -100;
    element.slidesArray = [0, 1, 2, 3];
    element.displayNext('left');
    expect(element.value).toBe(0);
  });

  it('should set correct translate value when clicking arrow right', () => {
    element.value = 100;
    element.slidesArray = [0, 1, 2, 3];
    element.displayNext('right');
    expect(element.value).toBe(0);
  });

  it('should set correct translate value when clicking arrow right', () => {
    element.value = -300;
    element.slidesArray = [0, 1, 2, 3];
    element.displayNext('right');
    expect(element.value).toBe(0);
  });

  it('should set correct active slide', () => {
    element.value = -300;
    element.setActiveSlide(2);
    expect(element.value).toBe(-200);
  });

  it('should set correct transform value based on the carousel container direction', () => {
    element.value = -300;
    element.direction = 'vertical';
    element.setTransformValue();
    expect(element.setTransformValue()).toBe('translateY(-300%)');
  });

  it('should set correct transform value based on the carousel container direction', () => {
    element.value = -200;
    element.direction = 'horizontal';
    element.setTransformValue();
    expect(element.setTransformValue()).toBe('translateX(-200%)');
  });
});
