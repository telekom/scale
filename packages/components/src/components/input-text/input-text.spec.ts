import { newSpecPage } from '@stencil/core/testing';
import { InputText } from './input-text';

describe('InputText', () => {
  let element;
  beforeEach(async () => {
    element = new InputText();
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('input-text--theme-default');
  });
});
