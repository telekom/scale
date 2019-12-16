import { Component, Host, Prop, ComponentInterface, h, Build } from '@stencil/core';
import siteStructure from '../../assets/docs-structure.json';
import { findItem, fileNotFound, ItemInfo } from '../../global/site-structure-utils';
import { MarkdownContent, SiteStructureItem } from '../../global/definitions';


@Component({
  tag: 'doc-component',
  styleUrl: 'doc-component.css'
})
export class DocumentComponent implements ComponentInterface {

  @Prop() page?: string;
  data?: ItemInfo;
  content?: MarkdownContent;

  async componentWillRender() {
    if (this.page) {
      console.log('componentWillRender', this.page);
      const data = this.data = findItem(siteStructure as SiteStructureItem[], this.page);

      if (!Build.isBrowser && !data.item) {
        fileNotFound();
        return;
      }

      if (data.item && data.item.filePath) {
        this.content = await fetchContent(data.item.filePath);
      }
    }
  }

  render() {
    const data = this.data;
    const content = this.content;
    if (!data || !content) {
      return null;
    }
    console.log('render3', this.page);
    return (
      <Host>
        <div class="container">
          <div class="container-inner">
            <stencil-route-title pageTitle={content.title}></stencil-route-title>
            <app-burger />
            <site-menu selectedParent={data.parent} siteStructureList={siteStructure as SiteStructureItem[]} />
            <div class="doc-content measure-lg">
              {toHypertext(content.hypertext)}
              <lower-content-nav next={data.nextItem} prev={data.prevItem}></lower-content-nav>
              <contributor-list contributors={content.contributors}></contributor-list>
            </div>
            <in-page-navigation
              pageLinks={content.headings}
              srcUrl={content.srcPath}
              currentPageUrl={content.url}
            ></in-page-navigation>
          </div>
        </div>
      </Host>
    );
  }
}


const localCache = new Map<string, Promise<MarkdownContent>>();

const fetchContent = (path: string) => {

  let promise = localCache.get(path);
  if (!promise) {
    console.log('fetchContent', path);
    promise = fetch(path).then(response => response.json());
    localCache.set(path, promise);
  }
  return promise;
}

const toHypertext = (data: any) => {
  if (!Array.isArray(data)) {
    console.error('content error, hypertext is undefined')
    return null;
  }
  const args = [];
  for (let i = 0; i < data.length; i++) {
    let arg = data[i];
    if (i === 0 && typeof arg === 'string' && tagBlacklist.includes(arg.toLowerCase().trim())) {
      arg = 'template';

    } else if (i === 1 && arg) {
      const attrs: any = {};
      Object.keys(arg).forEach(key => {
        const k = key.toLowerCase();
        if (!k.startsWith('on') && k !== 'innerhtml') {
          attrs[key] = arg[key];
        }
      });
      arg = attrs;

    } else if (i > 1) {
      if (Array.isArray(arg)) {
        arg = toHypertext(arg);
      }
    }
    args.push(arg);
  }
  return (h as any).apply(null, args);
};

const tagBlacklist = ['script', 'link', 'meta', 'object', 'head', 'html', 'body'];
