import { createDocument } from '@stencil/core/mock-doc';

export function convertHtmlToHypertextData(html: string) {
    const doc = createDocument();
    const div = doc.createElement('div');
    div.innerHTML = html;
    return convertElementToHypertextData(div);
  }
  
  function convertElementToHypertextData(node: Node) {
    const data = [];
  
    if (node.nodeType === 1) {
      const elm = node as HTMLElement;
      let tag = elm.tagName.toLowerCase();
  
      if (tagBlacklist.includes(tag)) {
        tag = 'template';
      }
  
      data.push(tag);
  
      if (elm.attributes.length > 0) {
        const attrs = {};
        for (let j = 0; j < elm.attributes.length; j++) {
          const attr = elm.attributes.item(j);
          attrs[attr.nodeName] = attr.nodeValue;
        }
        data.push(attrs);
  
      } else {
        data.push(null);
      }
  
      for (let i = 0; i < elm.childNodes.length; i++) {
        data.push(convertElementToHypertextData(elm.childNodes[i]));
      }
  
      return data;
  
    } else if (node.nodeType === 3) {
      return (node as Text).textContent;
    }
  
    return '';
  }
  
  const tagBlacklist = ['script', 'link', 'meta', 'object', 'head', 'html', 'body'];
  
  