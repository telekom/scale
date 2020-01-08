import { newSpecPage } from '@stencil/core/testing';
import { Rating } from './rating';

describe('Rating', () => {
  let element;
  beforeEach(async () => {
    element = new Rating();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Rating],
      html: `<t-rating>/t-rating>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should set preSelectValue when mouse entering', () => {
    element.preSelectValue = 0;
    element.handleMouseEnter(1);
    expect(element.preSelectValue).toBe(1);
  });

  it('should set new preSelectValue if there is a value set to selectedValue when mouse leaving', () => {
    element.selectedValue = 2;
    element.handleMouseLeave(5);
    expect(element.preSelectValue).toBe(2);
  });

  it('should set new preSelectValue to 0 if there is no value set to preSelectValue when mouse leaving', () => {
    element.selectedValue = 0;
    element.handleMouseLeave(5);
    expect(element.preSelectValue).toBe(0);
  });

  it('should set new selectedValue and preSelectValue if the selectedValue is not the same as param value when clicking', () => {
    element.selectedValue = 1;
    element.handleClick(5);
    expect(element.selectedValue).toBe(5);
    expect(element.preSelectValue).toBe(5);
  });

  it('should set new selectedValue to null and preSelectValue to 0 if the selectedValue is the same as param value when clicking', () => {
    element.selectedValue = 1;
    element.handleClick(1);
    expect(element.selectedValue).toBe(null);
    expect(element.preSelectValue).toBe(0);
  });

  it('should have class emoji when type value emoji is set', () => {
    element.type = 'emoji';
    expect(element.getCssClassMap()).toContain('rating__item--emoji');
  });
});
