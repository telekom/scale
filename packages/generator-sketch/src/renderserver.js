var connect = require("connect");
var serveStatic = require("serve-static");
var path = require("path");

const root = path.join(__dirname, "../sketch-render");

const server = connect()
  .use(serveStatic(root, { index: ["index.html", "index.htm"] }))
  .listen(3334, () => {
    console.log("Server running on 3334...");
  });

module.exports = server;
