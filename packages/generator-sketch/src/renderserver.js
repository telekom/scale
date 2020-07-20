var connect = require("connect");
var serveStatic = require("serve-static");
var path = require("path");
var fs = require("fs");

module.exports = function(root, port=3334) {
  const server = connect()
    .use(serveStatic(root, { index: false }))
    .listen(port, () => {
      console.log(`Serving ${root} on port ${port}`);
    });


  server.rootURL = `http://localhost:${port}/`;
  server.pageURLs = fs.readdirSync(root).filter(fn => /\.html?$/i.test(fn)).map(fn => server.rootURL + fn);
  return server;
};
