import {nodeTreeToSketchPage} from '@scaleds/html-to-sketch';

export function run(mainNode = document.body) {
  const artboards = Array.from(mainNode.querySelectorAll("*[data-sketch-artboard]"));
  if (artboards.length == 0) {
    artboards.push(mainNode);
  }
  return {
    name: document.title,
    artboards: artboards.map(mainNode => {
      const artboard = nodeTreeToSketchPage(mainNode);
      artboard.setName(mainNode.dataset.sketchArtboard || document.title);
      artboard._x = mainNode.getBoundingClientRect().left;
      artboard._y = mainNode.getBoundingClientRect().top;
      artboard._layers.splice(0).forEach(v => v._layers.forEach(l => artboard._layers.push(l)));
      return artboard.toJSON();
    })
  };
}
