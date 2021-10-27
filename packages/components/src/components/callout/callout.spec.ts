import { newSpecPage } from '@stencil/core/testing';
import { Callout } from './callout';

it('should reflect attributes/props', async () => {
  const page = await newSpecPage({
    components: [Callout],
    html: `<scale-callout
                size ="large"
                color ="primary"
                rotation ="15">
              </scale-callout>`,
  });

  expect(page.rootInstance.size).toBe('large');
  expect(page.rootInstance.color).toBe('primary');
  expect(page.rootInstance.rotation).toBe(15);
});

it('checks another color, other than prop', async () => {
  const page = await newSpecPage({
    components: [Callout],
    html: `<scale-callout
                size ="large"
                color ="red"
                rotation ="15">
              </scale-callout>`,
  });

  expect(page.rootInstance.size).toBe('large');
  expect(page.rootInstance.color).toBe('red');
  expect(page.rootInstance.rotation).toBe(15);
});
