import Group from './model/group';
import Style from './model/style';
import nodeToSketchLayers from './nodeToSketchLayers';
import {isNodeVisible} from './helpers/visibility';
import { removeJssNameFromClass } from './helpers/utils';

// Adopt DOM to include slotted content (needed to get slot styles)
const getAssignedNodes = (node: HTMLElement) => {
  if (node.nodeName === 'SLOT') {
    (node as HTMLSlotElement).assignedNodes()
      .forEach((slotNode: HTMLElement) => node.appendChild(slotNode));
  }
  return node
}

export default function nodeTreeToSketchGroup(node: HTMLElement, options: any) {
  let bcr = node.getBoundingClientRect();
  if (bcr.width === 0 && bcr.height === 0) {
    // Possibly broken getBoundingClientRect, let's try selecting the node.
    const rangeHelper = document.createRange();
    rangeHelper.selectNodeContents(node);
    bcr = rangeHelper.getBoundingClientRect();
  }
  const {left, top} = bcr;
  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  // Collect layers for the node level itself
  const layers = nodeToSketchLayers(node, {...options, layerOpacity: false}) || [];


  if (node.nodeName !== 'svg') {
    Array.from(node.children)
      .map(getAssignedNodes)
      .filter(isNodeVisible)
      // sort the children by computed z-index so that nodes with lower z-indexes are added
      // to the group first, "beneath" those with higher z-indexes
      .sort((a, b) => {
        const computedA: string = getComputedStyle(a).zIndex
        const computedB: string = getComputedStyle(b).zIndex
        const zIndexA: number = isNaN(Number(computedA)) ? 0 : +computedA
        const zIndexB: number = isNaN(Number(computedB)) ? 0 : +computedB
        return zIndexA - zIndexB;
      })
      .forEach((childNode: HTMLElement) => {
        if (childNode.shadowRoot) {
          // Get parent shadow root element
          const root = nodeTreeToSketchGroup(childNode, options)
          // Remove slotted content as it is already assigned
          root._layers = []
          // Process children
          const children = Array.from(childNode.shadowRoot.children)
            .filter(isNodeVisible)
            .map(nodeTreeToSketchGroup)
          // Align child and root positioning
          children.forEach(layer => {
            root._width = layer._width
            root._height = layer._height
            layer._x = 0
            layer._y = 0
            root._layers.push(layer)
          });
          layers.push(root)
        } else {
          layers.push(nodeTreeToSketchGroup(childNode, options));
        }
      });
  }

  // Now build a group for all these children
  const styles = getComputedStyle(node);
  const {opacity} = styles;

  const group = new Group({x: left, y: top, width, height});
  const groupStyle = new Style();

  groupStyle.addOpacity(opacity);
  group.setStyle(groupStyle);

  layers.forEach((layer: any) => {
    // Layer positions are relative, and as we put the node position to the group,
    // we have to shift back the layers by that distance.
    layer._x -= left;
    layer._y -= top;
    group.addLayer(layer);
  });

  // Set group name from a name provider in the options
  if (options && options.getGroupName) {
    group.setName(options.getGroupName(node));
  }
  // set group name from data-sketch-symbol if exists
  else if (node.getAttribute("data-sketch-symbol") && node.getAttribute("data-sketch-symbol") !== '') {
    group.setName(node.getAttribute("data-sketch-symbol"));
    group.setIsSymbol(true)
  }
  // set group name from id if exists
  else if (node.id && node.id !== '') {
    group.setName(`#${node.id}`);
  }
  // set group name from jss class if exists
  else if (node.classList[0] && node.classList[0] !== 'hydrated') {
    group.setName(`.${removeJssNameFromClass(node.classList[0])}`);
  }
  // set group name from node name
  else {
    group.setName(`${node.nodeName.toLowerCase()}`);
  }

  return group;
}
