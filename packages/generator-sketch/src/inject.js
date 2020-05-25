const nodeTreeToSketchPage = require("@scaleds/html-to-sketch")
  .nodeTreeToSketchPage;
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const URL = require("url").URL;
const DEBUG = false;
const crypto = require("crypto");

const server = require("./renderserver");

const url = "http://localhost:3334/";
let urlObj = null;
let directory = "sketch-json";

if (!fs.existsSync(directory)) {
  console.log(`generating directory: ${directory}`);
  fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

const outputFile = `./../${directory}/asketch.json`;

function delay(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
}

puppeteer.launch({ headless: !!!DEBUG ? true : false }).then(async browser => {
  const page = await browser.newPage();

  if (!!!DEBUG) {
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  }

  page.on("response", async response => {
    const url = response.url();
    if (response.request().resourceType() === "image") {
      response.buffer().then(file => {
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
    waitUntil: "networkidle2"
  });

  await page.addScriptTag({
    path: "./dist/build/page2layers.bundle.js"
  });

  const cdp = await page.target().createCDPSession();

  const docNodeId = (await cdp.send('DOM.getDocument')).root.nodeId;

  page.evaluate("page2layers.createStates()"); // Create hover/active/focus variants for components
  await delay(100); // Wait a bit for relayout

  await cdp.send('CSS.enable');

  const states = ['hover'];
  for (let i = 0; i < states.length; i++) {
    let state = states[i];

    // cdp.removeAllListeners('DOM.setChildNodes');
    // cdp.on('DOM.setChildNodes', async ({nodes}) => {
    //   for (let i = 0; i < nodes.length; i++) {
    //     const node = nodes[i];
    //     if (node.shadowRoots && node.shadowRoots.length > 0) {
    //       for (const shadowRoot of node.shadowRoots) {
    //         console.log(':', shadowRoot.nodeId);
    //         await cdp.send('DOM.requestChildNodes', {nodeId: shadowRoot.nodeId, depth: 1, pierce: true});
    //       }
    //     }
    //     console.log('>', node.nodeId);
    //     await cdp.send('CSS.forcePseudoState', {
    //       nodeId: node.nodeId,
    //       forcedPseudoClasses: [state],
    //     });
    //   }
    // });

    const nodeIds = (await cdp.send('DOM.querySelectorAll', {
      nodeId: docNodeId,
      selector: `[data-sketch-state="${state}"]`,
    })).nodeIds;

    for (const nodeId of nodeIds) {
      await cdp.send('CSS.forcePseudoState', {
        nodeId: nodeId,
        forcedPseudoClasses: [state],
      });
      // await cdp.send('DOM.requestChildNodes', {nodeId, depth: 1, pierce: true});
    }
  }
  await delay(3000); // Wait a bit for relayout

  const asketchPage = await page.evaluate("page2layers.run()");

  fs.writeFileSync(
    path.resolve(__dirname, outputFile),
    JSON.stringify(asketchPage)
  );

  if (!!!DEBUG) {
    await browser.close();
  }
  server.close();
});
