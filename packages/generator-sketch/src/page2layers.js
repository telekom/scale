import {nodeTreeToSketchPage} from '@telements/html-to-sketch';

export function run(mainNode = document.body) {
  const page = nodeTreeToSketchPage(mainNode);
  page.setName(document.title);
  return page.toJSON();
}
