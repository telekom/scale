const { replaceInFileSync } = require('replace-in-file');

replaceInFileSync({
  files: 'packages/**/README.md',
  ignore: ['packages/components/README.md'],
  from: [
    /@telekom\/scale\-components\-react/g,
    /@telekom\/scale\-components\//g,
    /\`@telekom\/scale\-components\`/g,
  ],
  to: [
    `@telekom/scale-components-react-neutral`,
    `@telekom/scale-components-neutral/`,
    '`telekom/scale-components-neutral`',
  ],
});

replaceInFileSync({
  files: 'packages/components/package.json',
  from: /\"name\": \"@telekom\/scale\-components\"/g,
  to: `"name": "@telekom/scale-components-neutral"`,
});
replaceInFileSync({
  files: 'packages/components-react/package.json',
  from: /\"name\": \"@telekom\/scale\-components\-react\"/g,
  to: `"name": "@telekom/scale-components-react-neutral"`,
});
