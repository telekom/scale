const path = require("path");
const fs = require("fs");

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

module.exports = async function(moduleOptions) {
  const options = {
    ...this.options["scaled"],
    ...moduleOptions
  };

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    fileName: "plugin.js",
    options
  });

  await decorateStoreWithUserTheme(getTransformer(options.theme));

  const { renderToString } = require(transformedHydrateFilePath);

  // @Hook: render:route
  this.nuxt.hook("render:route", async (url, page) => {
    const { html } = await renderToString(page.html, { url });
    page.html = html;
  });

  // @Hook: generate:page
  this.nuxt.hook("generate:page", async page => {
    const { html } = await renderToString(page.html, {
      url: page.path
    });

    page.html = html;
  });
};

module.exports.meta = require("../package.json");
