import Artboard from './model/artboard';
import Page from './model/page';
import nodeTreeToSketchGroup from './nodeTreeToSketchGroup';

function traverse(node: HTMLElement) {
  if (/^scale-/i.test(node.nodeName)) {
    const componentName = node.getAttribute('data-sketch-symbol') || node.nodeName.replace(/^scale-/i, '').toLowerCase();
    node.setAttribute('data-sketch-symbol', `${componentName}`);
    const attrVariant:string[] = [];
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      if (!/^class$|^data-|^variant$/.test(attr.name)) {
        if (attr.value.length < 32) {
          attrVariant.push(`${attr.name}:${attr.value.slice(0,32)}`)
        } else {
          attrVariant.push(`${attr.name}`)
        }
      }
    }
    const variant = node.getAttribute('data-sketch-variant') || node.getAttribute('variant');
    node.setAttribute('data-sketch-variant', (variant || '') + 
      (attrVariant.length > 0 ? ((variant ? ' / ' : '') + attrVariant.join(" / ")) : ''));
  }
  for (let i = 0; i < node.children.length; i++) {
    traverse(node.children[i] as unknown as HTMLElement);
  }
  if (node.shadowRoot) {
    traverse(node.shadowRoot as unknown as HTMLElement);
  }
}

export default function nodeTreeToSketchPage(node: HTMLElement, options: any) {
  traverse(node);

  const rootGroup = nodeTreeToSketchGroup(node, options);

  const bcr = node.getBoundingClientRect();
  const page = new Page({
    width: bcr.right - bcr.left,
    height: bcr.bottom - bcr.top,
  });

  if (options && options.addArtboard) {
    const artboard = new Artboard({
      x: 0,
      y: 0,
      width: rootGroup._width,
      height: rootGroup._height,
    });

    artboard.addLayer(rootGroup);

    if (options.artboardName) {
      artboard.setName(options.artboardName);
    }

    page.addLayer(artboard);
  } else {
    page.addLayer(rootGroup);
  }

  if (options && options.pageName) {
    page.setName(options.pageName);
  }

  return page;
}
