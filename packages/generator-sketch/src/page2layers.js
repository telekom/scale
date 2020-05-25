import {nodeTreeToSketchPage} from '@scaleds/html-to-sketch';

export function run(mainNode = document.body) {
  const page = nodeTreeToSketchPage(mainNode);
  page.setName(document.title);
  return page.toJSON();
}

export function createStates(node = document.body) {
  // const nodes = node.querySelectorAll("*");
  // const components = Array.from(nodes).filter(n => /^scale-/i.test(n.nodeName));
  // components.forEach(c => {
  //   if (c.parentNode && !/^scale-/i.test(c.parentNode.nodeName)) {
  //     const parent = c.parentNode;
  //     ['hover'].forEach(state => {
  //       let stateNode = c.cloneNode(true);
  //       stateNode.setAttribute('data-sketch-state', state);
  //       parent.insertBefore(stateNode, c.nextSibling);
  //       parent.insertBefore(document.createTextNode(' '), c.nextSibling);
  //     });
  //   }
  // });
}

