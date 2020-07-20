const nodeTreeToSketchPage = require("@scaleds/html-to-sketch")
  .nodeTreeToSketchPage;
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const URL = require("url").URL;
const DEBUG = false;
const crypto = require("crypto");

const root = (process.argv[2] || path.join(__dirname, "../sketch-render"));
const port = 3334;

const server = require("./renderserver")(root, port);

let urlObj = null;
let directory = "sketch-json";

if (!fs.existsSync(directory)) {
  console.log(`generating directory: ${directory}`);
  fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

const outdirPath = path.resolve(__dirname, `./../${directory}`)
fs.readdirSync(outdirPath).forEach(fn => {
  fs.unlinkSync(path.resolve(outdirPath, fn));
});

function delay(timeout) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
}

puppeteer
  .launch({ headless: !!!DEBUG ? true : false })
  .then(async (browser) => {
    let pageIndex = 0;
    for (const url of server.pageURLs) {
      pageIndex++;
      const outputFile = `./../${directory}/page-${pageIndex}.json`;
      try {
        console.log("Processing page", url);
        const page = await browser.newPage();

        if (!!!DEBUG) {
          page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
        }

        page.on("response", async (response) => {
          const url = response.url();
          if (response.request().resourceType() === "image") {
            response.buffer().then((file) => {
              const fileName = crypto
                .createHash("sha1")
                .update(url)
                .digest("hex");
              const filePath = path.resolve(
                __dirname,
                `./../${directory}/${fileName}`
              );
              fs.writeFileSync(filePath, file);
            });
          }
        });

        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(url, {
          waitUntil: "networkidle2",
        });

        await page.addScriptTag({
          path: "./dist/build/page2layers.bundle.js",
        });

        const asketchPage = await page.evaluate("page2layers.run()");

        fs.writeFileSync(
          path.resolve(__dirname, outputFile),
          JSON.stringify(asketchPage)
        );
      } catch (e) {
        console.log(e);
      }
    }

    if (!!!DEBUG) {
      await browser.close();
    }
    server.close();
  });
