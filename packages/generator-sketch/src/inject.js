const nodeTreeToSketchPage = require('@telements/html-to-sketch').nodeTreeToSketchPage;
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const URL = require('url').URL;

const url = 'http://localhost:3334/';
let urlObj = null;
let directory = 'sketch-json'

if (!fs.existsSync(directory)) {
    console.log(`generating directory: ${directory}`);
    fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

const outputFile = `./../${directory}/button.json`;

puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    await page.addScriptTag({
        path: './dist/build/page2layers.bundle.js'
    });

    // const document = await page.evaluate(() => document.body.innerHTML)

    // console.log(document)


    const asketchPage = await page.evaluate(('page2layers.run()'));

    fs.writeFileSync(
        path.resolve(__dirname, outputFile),
        JSON.stringify(asketchPage)
    );

    // browser.close();
});
