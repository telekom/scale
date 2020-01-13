import 'dotenv';
import marked from 'marked';
import glob from 'glob';
import { promisify } from 'util';
import path from 'path';
import { readFile, writeFile, mkdirp, remove } from 'fs-extra';

import { collectHeadingMetadata, changeCodeCreation, localizeMarkdownLink } from './markdown-renderer';
import frontMatter from 'front-matter';
import { SiteStructureItem, MarkdownContent } from '../src/global/definitions';
import { convertHtmlToHypertextData } from './lib/hypertext'

const globAsync = promisify(glob);

const DESTINATION_DIR = './src/assets/docs';
const SOURCE_DIR = './src/docs';
const SITE_STRUCTURE_FILE = './src/assets/docs-structure.json';

const filePromise = async (filePath: string, siteStructureJson) => {
  if (filePath === './src/docs/README.md') {
    return Promise.resolve();
  }
  let htmlContents = '';
  let markdownMetadata: MarkdownContent = {};
  const jsonFileName = path.relative(SOURCE_DIR, filePath);
  const destinationFileName = path.join(
    DESTINATION_DIR,
    path.dirname(jsonFileName),
    path.basename(jsonFileName, '.md') + '.json'
  );
  markdownMetadata.headings = [];

  const markdownContents = await readFile(filePath, { encoding: 'utf8' });

  try {
    let parsedMarkdown = frontMatter<any>(markdownContents);
    const renderer = new marked.Renderer();

    collectHeadingMetadata(renderer, markdownMetadata);
    changeCodeCreation(renderer);
    localizeMarkdownLink(renderer, destinationFileName.replace('src', ''), siteStructureJson);

    htmlContents = marked(parsedMarkdown.body, {
      renderer,
      headerIds: true
    }).trim();

    await mkdirp(path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName)
    ));

    const data = {
      ...parsedMarkdown.attributes,
      ...markdownMetadata,
      srcPath: filePath,
      hypertext: convertHtmlToHypertextData(htmlContents)
    };

    if (typeof data.title !== 'string') {
      data.title = 'Stencil';
    } else {
      data.title = data.title.trim() + ' - Stencil';
    }

    await writeFile(destinationFileName, JSON.stringify(data), {
      encoding: 'utf8'
    });

  } catch (e) {
    console.error(filePath);
    throw e;
  }
}

const getSiteStructure = async () => {
  const siteStructure = await readFile(SITE_STRUCTURE_FILE, { encoding: 'utf8' });
  const siteStructureJson: SiteStructureItem[] = JSON.parse(siteStructure);
  return siteStructureJson
}

export const handleFile = async (filePath: string) => {
  const siteStructureJson = await getSiteStructure();
  console.log(`running single: ./${filePath}`);
  const singleFilePromise = filePromise(`./${filePath}`, siteStructureJson);
  await Promise.all([singleFilePromise]);
}

(async function () {
  const siteStructureJson = await getSiteStructure();
  console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
  const files = await globAsync(`${SOURCE_DIR}/**/*.md`, {});

  await remove(DESTINATION_DIR);

  const filePromises = files.map(async (filePath) => {
    console.log('filePath:batch', filePath)
    filePromise(filePath, siteStructureJson);
  });

  await Promise.all(filePromises);

  console.log(`successfully converted ${filePromises.length} files`);
})();



