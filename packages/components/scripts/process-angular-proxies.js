const fs = require('fs');
const angularProxiesFile = '../components-angular/src/directives/proxies.ts';

fs.readFile(angularProxiesFile, 'utf8', (err, data) => {
  if (err) return console.log(err);

  // regex matches the kebab case event name
  const withEscapedKeys = data.replace(/(\w)+(-(\w)+)+!:/g, (match) => {
    return `"${match.split('!:')[0]}"!:`;
  });

  fs.writeFile(angularProxiesFile, withEscapedKeys, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});
