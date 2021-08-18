const glob = require("glob");
const fs = require("fs");
const path = require("path");

function renderToString() {
  const {
    renderToString
  } = require("@telekom/scale-components/hydrate/index.js");

  const files = glob.sync(path.join(process.cwd(), "/public/**/*.html"));

  return Promise.all(
    files.map(file => {
      try {
        return renderToString(fs.readFileSync(file, "utf8"), {
          clientHydrateAnnotations: false
        }).then(result => {
          return fs.writeFileSync(file, result.html);
        });
      } catch (error) {
        if (error.code === "EISDIR") {
          return;
        }
        throw error;
      }
    })
  );
}

function onPostBuild() {
  return renderToString().catch(error =>
    console.error("Something went wrong while hydrating the HTML markup", error)
  );
}

exports.onPostBuild = onPostBuild;
