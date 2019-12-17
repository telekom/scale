import { newSpecPage } from '@stencil/core/testing';
import { Slider } from './slider';

describe('Slider', () => {
  let element;
  beforeEach(async () => {
    element = new Slider();
  });

  const e = { clientX: 12 };

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<t-slider></t-slider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have class disabled', () => {
    element.disabled = true;
    expect(element.getCssClassMap()).toContain('slider--track-disabled');
  });

  it('should not start to drag if slider track is disabled', () => {
    element.disabled = true;
    element.onButtonDown();
    expect(element.onButtonDown()).toBe(undefined);
  });

  it('should set dragging value if slider track is not disabled', () => {
    element.disabled = false;
    element.dragging = false;
    element.onButtonDown(e);
    expect(element.dragging).toBe(true);
  });

  it('should set startX if slider track is not disabled', () => {
    element.disabled = false;
    element.startX = 0;
    element.onButtonDown(e);
    expect(element.startX).toBe(12);
  });

  it('should set start position if slider track is not disabled', () => {
    element.disabled = false;
    element.startPosition = 0;
    element.value = 40;
    element.min = 0;
    element.max = 100;
    element.onButtonDown(e);
    expect(element.startPosition).toBe(40);
  });

  it('should set start position if slider track is not disabled', () => {
    element.disabled = false;
    element.startPosition = 0;
    element.value = 40;
    element.min = 0;
    element.max = 100;
    element.onButtonDown(e);
    expect(element.startPosition).toBe(40);
  });

  it('should not set any value during dragging when dragging is false', () => {
    element.dragging = false;
    element.onDragging(e);
    expect(element.onDragging(e)).toEqual(undefined);
  });

  it('should set currentX value during dragging ', () => {
    element.dragging = true;
    element.currentX = 0;
    element.sliderTrack = { offsetWidth: 600 };
    element.onDragging(e);
    expect(element.currentX).toBe(12);
  });

  it('should set currentX value during dragging ', () => {
    element.dragging = true;
    element.currentX = 0;
    element.sliderTrack = { offsetWidth: 600 };
    element.onDragging(e);
    expect(element.currentX).toBe(12);
  });

  it('should set diff value during dragging ', () => {
    element.dragging = true;
    element.startX = 7;
    element.sliderTrack = { offsetWidth: 600 };
    element.newPosition = 0;
    element.startPosition = 43;
    element.onDragging(e);
    expect(element.newPosition).toBe(43.833333333333336);
  });

  it('should set position value', () => {
    element.max = 100;
    element.min = 0;
    element.step = 1;
    element.value = 40;
    element.setPosition(20);
    expect(element.value).toBe(20);
  });

  /*   it('should set position value', () => {
    let params = -1;
    element.setPosition(params);
    expect(params).toBe(0);
  }); */

  it('should return current position', () => {
    element.value = 50;
    element.min = 0;
    element.max = 100;
    element.currentPosition();
    expect(element.currentPosition()).toBe('50%');
  });

  it('should not set any value if dragging is set false', () => {
    element.dragging = false;
    element.onDragEnd();
    expect(element.onDragEnd()).toEqual(undefined);
  });

  it('should set dragging to false when calling onDragEnd function', () => {
    element.dragging = true;
    element.onDragEnd();
    setTimeout(() => {
      expect(element.dragging).toBe(false);
    }, 0);
  });
});
