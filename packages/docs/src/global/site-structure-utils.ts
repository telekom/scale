import { SiteStructureItem } from './definitions';

export interface ItemInfo {
  item?: SiteStructureItem
  nextItem?: SiteStructureItem;
  prevItem?: SiteStructureItem;
  parent?: SiteStructureItem
}

export const findItem = (siteStructureList: SiteStructureItem[], url: string, foundData: ItemInfo = { parent: undefined }) => {

  for (const item of siteStructureList) {
    if (item.url === url) {
      foundData.item = item;
    } else if (foundData.item != null && item.url != null) {
      foundData.nextItem = item;
    } else if (item.url != null && foundData.item == null) {
      foundData.prevItem = item;
    } else if (item.children && item.children.length > 0) {
      if (foundData.item == null) {
        foundData.parent = item;
      }
      foundData = findItem(item.children, url, foundData);
    }

    if (foundData.item != null && foundData.nextItem != null) {
      return foundData;
    }
  }

  return foundData;
};


export const fileNotFound = () => {
  const metaTag = document.createElement('meta');
  metaTag.setAttribute('http-equiv', 'status');
  metaTag.setAttribute('content', '404');
  document.head.appendChild(metaTag);
};
