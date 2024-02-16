const replace = require('replace-in-file');
const fs = require('fs');

fs.rename(
  'packages/components-angular/src/component-library-module-neutral.ts',
  'packages/components-angular/src/component-library-module.ts',
  function (err) {
    if (err) console.log('ERROR: ' + err);
  }
);

replace.sync({
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

replace.sync({
  files: 'packages/components/package.json',
  from: /\"name\": \"@telekom\/scale\-components\"/g,
  to: `"name": "@telekom/scale-components-neutral"`,
});
replace.sync({
  files: 'packages/components-react/package.json',
  from: /\"name\": \"@telekom\/scale\-components\-react\"/g,
  to: `"name": "@telekom/scale-components-react-neutral"`,
});
replace.sync({
  files: 'packages/components-angular/package.json',
  from: /\"name\": \"@telekom\/scale\-components\-angular\"/g,
  to: `"name": "@telekom/scale-components-angular-neutral"`,
});
replace.sync({
  files: 'packages/components-vue/package.json',
  from: /\"name\": \"@telekom\/scale\-components\-vue\"/g,
  to: `"name": "@telekom/scale-components-vue-neutral"`,
});
