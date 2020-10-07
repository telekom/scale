import Group from './model/group';
import Style from './model/style';
import nodeToSketchLayers from './nodeToSketchLayers';
import {isNodeVisible} from './helpers/visibility';
import { removeJssNameFromClass } from './helpers/utils';

// const materializeStyles = (node: Element) => {
//   if (node.children) {
//     Array.from(node.children).forEach(c => materializeStyles(c));
//   }
//   if (node && (node as HTMLElement).style) {
//     const style = getComputedStyle(node);
//     if (style) {
//       Array.from(style).forEach(key => (node as HTMLElement).style.setProperty(key, style.getPropertyValue(key), style.getPropertyPriority(key)));
//     }
//   }
//   return node;
// }

// // Adopt DOM to include slotted content (needed to get slot styles)
// // This ain't gonna work, slot should rather descend into its assignedNodes()
// const getAssignedNodes = (node: HTMLElement) => {
//   if (node.nodeName === 'SLOT') {
//     (node as HTMLSlotElement).assignedNodes()
//       .forEach((slotNode: HTMLElement) => node.appendChild(materializeStyles(slotNode)));
//   }
//   return node
// }

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

  const group = new Group({x: left, y: top, width, height});

  // Collect layers for the node level itself
  const layers = nodeToSketchLayers(node, group, {...options, layerOpacity: false}) || [];

  const processChild = (childNode: HTMLElement) => {
    if (childNode.shadowRoot) {
      // Get parent shadow root element
      const root = nodeTreeToSketchGroup(childNode, options);
      // Remove slotted content as it is already assigned
      root._layers = [];
      // Process children
      const children = Array.from(childNode.shadowRoot.children)
        .filter(isNodeVisible)
        .map(c => nodeTreeToSketchGroup(c as HTMLElement, options));
      // Align child and root positioning
      let minX = root._x, maxX = minX + root._width, minY = root._y, maxY = minY + root._height;
      children.forEach(layer => {
        minX = Math.min(minX, layer._x);
        minY = Math.min(minY, layer._y);
        maxX = Math.max(maxX, layer._x + layer._width);
        maxY = Math.max(maxY, layer._y + layer._height);
        root._layers.push(layer);
      });
      root._x = minX;
      root._y = minY;
      root._width = maxX - minX;
      root._height = maxY - minY;
      root._layers.forEach((layer:any) => {
        layer._x -= root._x;
        layer._y -= root._y;
      });
      
      layers.push(root);
    } else if (childNode.tagName == 'IFRAME' && (childNode as HTMLIFrameElement).contentDocument) {
      const iframe = (childNode as HTMLIFrameElement);
      if (iframe.contentDocument !== null) {
        const root = nodeTreeToSketchGroup(iframe, options);
        if (iframe.contentDocument.body.parentElement) {

          iframe.contentDocument.body.parentElement.style.height = '100%';
          iframe.contentDocument.body.style.height = '100%';

          var cc = iframe.contentDocument.body.offsetHeight;
          iframe.contentDocument.body.dataset.height = String(cc);

          var cc = iframe.contentDocument.body.parentElement.offsetHeight;
          iframe.contentDocument.body.parentElement.dataset.height = String(cc);

          // FIXME child symbols are not generated. No idea why. 
          // Adding iframe body.children as nodeTreeToSketchGroups gets me
          // the modal text but not the background colors and drop shadows. Again: Why?
          // The modal divs don't show up but the text is in the right place and with the right style. Why?
          const iframeOptions = {...options, debugStyle: true};
          const children = Array.from(iframe.contentDocument.children)
            .filter(isNodeVisible)
            .map(c => nodeTreeToSketchGroup(c as HTMLElement, iframeOptions));
          children.forEach(c => root._layers.push(c));
        }
        layers.push(root);
      }
    } else if (childNode.tagName === 'SLOT') {
      // Push slotted text nodes directly into the slot
      const childNodes = Array.from((childNode as HTMLSlotElement).assignedNodes())
        .filter(n => {
          if (n.nodeType === 3) {
            childNode.appendChild(n);
            return false;
          } else {
            return true;
          }
        });
      // Get parent shadow root element
      const root = nodeTreeToSketchGroup(childNode, options);
      // Process children
      if (childNodes.length > 0) {
        const children = childNodes
          .filter(isNodeVisible)
          .map(c => nodeTreeToSketchGroup(c as HTMLElement, options));
        // Align child and root positioning
        let minX = root._x, maxX = minX + root._width, minY = root._y, maxY = minY + root._height;
        children.forEach(layer => {
          minX = Math.min(minX, layer._x);
          minY = Math.min(minY, layer._y);
          maxX = Math.max(maxX, layer._x + layer._width);
          maxY = Math.max(maxY, layer._y + layer._height);
          root._layers.push(layer);
        });
        root._x = minX;
        root._y = minY;
        root._width = maxX - minX;
        root._height = maxY - minY;
        root._layers.forEach((layer:any) => {
          layer._x -= root._x;
          layer._y -= root._y;
        });
      }
      layers.push(root);
    } else {
      layers.push(nodeTreeToSketchGroup(childNode, options));
    }
  };
  const children = Array.from(node.children);
  children
    .filter(isNodeVisible)
    // .map(getAssignedNodes)
    // sort the children by computed z-index so that nodes with lower z-indexes are added
    // to the group first, "beneath" those with higher z-indexes
    .sort((a, b) => {
      const computedA: string = getComputedStyle(a).zIndex
      const computedB: string = getComputedStyle(b).zIndex
      const zIndexA: number = isNaN(Number(computedA)) ? 0 : +computedA
      const zIndexB: number = isNaN(Number(computedB)) ? 0 : +computedB
      return zIndexA - zIndexB;
    })
    .forEach(processChild);
  // Process the added children. This is used for range input -webkit-slider-thumb and -webkit-slider-runnable-track.
  for (let i = children.length, l = node.children.length; i < l; i++) {
    processChild(node.children[i] as HTMLElement);
  }

  // Now build a group for all these children
  const styles = getComputedStyle(node);
  const {opacity} = styles;

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
    group.setIsSymbol(true);
    const variant = node.getAttribute('data-sketch-variant');
    if (variant !== null && variant !== '') {
      const state = node.getAttribute('data-sketch-state');
      group.setVariant(variant + (state ? `:${state}` : ''));
    }
    group.setName(node.getAttribute("data-sketch-symbol")); // + " / " + variant);
    const stableSymbolName = node.getAttribute("data-sketch-key");
    if (stableSymbolName && stableSymbolName !== '') {
      group.setStableSymbolName(stableSymbolName);
    }
  }
  else if (node.getAttribute("data-sketch-name") && node.getAttribute("data-sketch-name") !== '') {
    group.setName(node.getAttribute("data-sketch-name"));
  }
  else if (/^H\d$/i.test(node.tagName) && node.textContent != '') {
    group.setName(node.textContent);
  }
  else if (node.id && node.id !== '') {
    group.setName(`${node.nodeName.toLowerCase()}#${node.id}`);
  }
  // set group name from jss class if exists
  else if (node.classList[0] && node.classList[0] !== 'hydrated') {
    group.setName(`${node.nodeName.toLowerCase()}.${removeJssNameFromClass(node.classList[0])}`);
  }
  // set group name from node name
  else {
    group.setName(`${node.nodeName.toLowerCase()}`);
  }

  if (node instanceof SVGClipPathElement || node instanceof SVGDefsElement) { // Hide clipPaths
    group._isVisible = false;
  }

  return group;
}
