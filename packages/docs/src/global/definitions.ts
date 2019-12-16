export interface MarkdownContent {
  title?: string;
  description?: string;
  url?: string;
  contributors?: string[];
  headings?: MarkdownHeading[];
  srcPath?: string;
  hypertext?: any[];
}

export interface MarkdownHeading {
  id: string;
  level: number;
  text: string;
}

export interface SiteStructureItem {
  text: string,
  url?: string;
  filePath?: string;
  children?: SiteStructureItem[];
}

export interface BlogPostInterface {
  title: string;
  date: string;
  url: string;
  author: string;
  twitter: string;
  description: string;
  img: string;
  filePath?: string;
}
