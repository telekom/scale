const { replaceInFileSync } = require('replace-in-file');
const fs = require('fs');

fs.renameSync(
  'packages/components-angular/src/component-library-module-neutral.ts',
  'packages/components-angular/src/component-library-module.ts'
);

replaceInFileSync({
  files: 'packages/**/README.md',
  ignore: ['packages/components/README.md', 'packages/design-tokens/README.md'],
  from: [
    /@telekom\/scale\-components\-react/g,
    /@telekom\/scale\-components\-angular/g,
    /@telekom\/scale\-components\-vue/g,
    /@telekom\/scale\-components\//g,
    /\`@telekom\/scale\-components\`/g,
  ],
  to: [
    `@telekom/scale-components-react-neutral`,
    `@telekom/scale-components-angular-neutral`,
    `@telekom/scale-components-vue-neutral`,
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
replaceInFileSync({
  files: 'packages/components-angular/package.json',
  from: /\"name\": \"@telekom\/scale\-components\-angular\"/g,
  to: `"name": "@telekom/scale-components-angular-neutral"`,
});
replaceInFileSync({
  files: 'packages/components-vue/package.json',
  from: /\"name\": \"@telekom\/scale\-components\-vue\"/g,
  to: `"name": "@telekom/scale-components-vue-neutral"`,
});
