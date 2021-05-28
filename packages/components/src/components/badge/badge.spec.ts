import { newSpecPage } from '@stencil/core/testing';
import { Badge } from './badge';

it('should reflect attributes/props', async () => {
  const page = await newSpecPage({
    components: [Badge],
    html: `<scale-badge
                size ="big"
                color ="magenta"
                rotation ="15">
              </scale-badge>`,
  });

  expect(page.rootInstance.size).toBe('big');
  expect(page.rootInstance.color).toBe('magenta');
  expect(page.rootInstance.rotation).toBe(15);
});

it('check style --badge-text-width is ${width} for size="big"', async () => {
  const widthBig = '126.5px';
  const page = await newSpecPage({
    components: [Badge],
    html: `<scale-badge size="big"></scale-badge>`,
  });
  const styles = page.rootInstance.displayStyle();
  expect(styles.includes(`--badge-text-width:${widthBig}`)).toBe(true);
});

it('check style --badge-text-width is ${width} for size="small"', async () => {
  const widthSmall = '86px';
  const page = await newSpecPage({
    components: [Badge],
    html: `<scale-badge size="small"></scale-badge>`,
  });
  const styles = page.rootInstance.displayStyle();
  expect(styles.includes(`--badge-text-width:${widthSmall}`)).toBe(true);
});

it('checks another color, other than prop', async () => {
  const page = await newSpecPage({
    components: [Badge],
    html: `<scale-badge
                size ="big"
                color ="red"
                rotation ="15">
              </scale-badge>`,
  });

  expect(page.rootInstance.size).toBe('big');
  expect(page.rootInstance.color).toBe('red');
  expect(page.rootInstance.rotation).toBe(15);
});
