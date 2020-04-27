const glob = require("glob");
const fs = require("fs");
const { renderToString } = require('@scaleds/components/hydrate');

exports.onPostBuild = async ({}, pluginOptions) => {
  const files = glob.sync("public/**/*.html");
  return Promise.all(
    files.map(async file => {
      try {
        const html = fs.readFileSync(file, "utf8");
        const result = await renderToString(html, {
          prettyHtml: true
        });
        fs.writeFileSync(file, result.html);
        return result;
      } catch (e) {
        // Ignore error where path is a directory
        if (e.code === "EISDIR") {
          return;
        }

        throw e;
      }
    })
  );
};
