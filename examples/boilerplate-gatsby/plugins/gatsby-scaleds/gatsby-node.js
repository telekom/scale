const glob = require("glob")
const fs = require("fs")
const path = require("path")
const { Transform } = require("stream")

const originalHydrateFilePath = path.join(
  __dirname,
  "../../node_modules/@scaleds/components/hydrate/index.js"
)
const transformedHydrateFilePath = path.join(__dirname, "/hydrate.js")

function getTransformer(theme) {
  return new Transform({
    transform(chunk, encoding, callback) {
      const magicString = `'ʕ•ᴥ•ʔ theme store magic placeholder ʕ•ᴥ•ʔ'`
      const chunkString = chunk.toString()

      this.push(
        !chunkString.includes(magicString)
          ? chunkString
          : chunkString.replace(magicString, JSON.stringify(theme))
      )

      callback()
    }
  })
}

function decorateStoreWithUserTheme(transformer) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(originalHydrateFilePath)
      .pipe(transformer)
      .pipe(fs.createWriteStream(transformedHydrateFilePath))
      .on("finish", resolve)
      .on("error", reject)
  })
}

function renderToStringWithUserTheme() {
  const { renderToString } = require(transformedHydrateFilePath)
  const files = glob.sync(path.join(__dirname, "../../public/**/*.html"))

  return Promise.all(
    files.map(file => {
      try {
        return renderToString(fs.readFileSync(file, "utf8"), {
          prettyHtml: true
        }).then(result => fs.writeFileSync(file, result.html))
      } catch (error) {
        if (error.code === "EISDIR") {
          return
        }
        throw error
      }
    })
  )
}

function onPostBuild(ctx, options) {
  console.log();
  return decorateStoreWithUserTheme(getTransformer(options.theme))
    .then(renderToStringWithUserTheme)
    .then(() => fs.unlinkSync(transformedHydrateFilePath))
}

exports.onPostBuild = onPostBuild
