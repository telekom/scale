import { newSpecPage } from '@stencil/core/testing';
import { Badge } from './badge';

it('should reflect attributes/props', async () => {
  const page = await newSpecPage({
    components: [Badge],
    html: `<scale-badge
                size ="large"
                color ="primary"
                rotation ="15">
              </scale-badge>`,
  });

  expect(page.rootInstance.size).toBe('large');
  expect(page.rootInstance.color).toBe('primary');
  expect(page.rootInstance.rotation).toBe(15);
});

it('checks another color, other than prop', async () => {
  const page = await newSpecPage({
    components: [Badge],
    html: `<scale-badge
                size ="large"
                color ="red"
                rotation ="15">
              </scale-badge>`,
  });

  expect(page.rootInstance.size).toBe('large');
  expect(page.rootInstance.color).toBe('red');
  expect(page.rootInstance.rotation).toBe(15);
});
