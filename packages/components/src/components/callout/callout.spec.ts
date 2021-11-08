import { newSpecPage } from '@stencil/core/testing';
import { Callout } from './callout';

it('should reflect attributes/props', async () => {
  const page = await newSpecPage({
    components: [Callout],
    html: `<scale-callout
                size ="large"
                variant ="primary"
                rotation ="15">
              </scale-callout>`,
  });

  expect(page.rootInstance.size).toBe('large');
  expect(page.rootInstance.variant).toBe('primary');
  expect(page.rootInstance.rotation).toBe(15);
});

it('checks another variant, other than prop', async () => {
  const page = await newSpecPage({
    components: [Callout],
    html: `<scale-callout
                size ="large"
                variant ="red"
                rotation ="15">
              </scale-callout>`,
  });

  expect(page.rootInstance.size).toBe('large');
  expect(page.rootInstance.variant).toBe('red');
  expect(page.rootInstance.rotation).toBe(15);
});
