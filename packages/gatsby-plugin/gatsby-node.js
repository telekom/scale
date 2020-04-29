const glob = require("glob");
const fs = require("fs");
const path = require("path");

const { Transform } = require("stream");
const { THEME_MAGIC_STRING } = require("@scaleds/components/dist/theme");

const transformedHydrateFilePath = path.join(__dirname, "/hydrate.js");

function getTransformer(theme) {
  return new Transform({
    transform(chunk, encoding, callback) {
      const chunkString = chunk.toString();

      this.push(
        !chunkString.includes(`'${THEME_MAGIC_STRING}'`)
          ? chunkString
          : chunkString.replace(
              `'${THEME_MAGIC_STRING}'`,
              JSON.stringify(theme)
            )
      );

      callback();
    }
  });
}

function decorateStoreWithUserTheme(transformer) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(require.resolve("@scaleds/components/hydrate/index.js"))
      .pipe(transformer)
      .pipe(fs.createWriteStream(transformedHydrateFilePath))
      .on("finish", resolve)
      .on("error", reject);
  });
}

function renderToStringWithUserTheme() {
  const { renderToString } = require(transformedHydrateFilePath);
  const files = glob.sync(path.join(process.cwd(), "/public/**/*.html"));

  return Promise.all(
    files.map(file => {
      try {
        return renderToString(fs.readFileSync(file, "utf8"), {
          prettyHtml: true
        }).then(result => {
          return fs.writeFileSync(file, result.html)
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

function onPostBuild(ctx, options) {
  return decorateStoreWithUserTheme(getTransformer(options.theme))
    .then(renderToStringWithUserTheme)
    .then(() => fs.unlinkSync(transformedHydrateFilePath))
    .catch(error =>
      console.error(
        "Something went wrong while hydrating the HTML markup",
        error
      )
    );
}

exports.onPostBuild = onPostBuild;
