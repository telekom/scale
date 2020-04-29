const nodeTreeToSketchPage = require('@scaleds/html-to-sketch').nodeTreeToSketchPage;
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const URL = require('url').URL;
const DEBUG = false
const crypto = require('crypto');

const url = 'http://localhost:3334/';
let urlObj = null;
let directory = 'sketch-json'

if (!fs.existsSync(directory)) {
    console.log(`generating directory: ${directory}`);
    fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

const outputFile = `./../${directory}/asketch.json`;

puppeteer.launch({headless: !!!DEBUG ? true : false}).then(async browser => {
    const page = await browser.newPage();

    if (!!!DEBUG) {
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    }

    page.on('response', async response => {
        const url = response.url();
        if (response.request().resourceType() === 'image') {
            response.buffer().then(file => {
                const fileName = crypto
                    .createHash('sha1')
                    .update(url)
                    .digest('hex');
                const filePath = path.resolve(__dirname, `./../${directory}/${fileName}`);
                fs.writeFileSync(filePath, file);
            });
        }
    });

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    await page.addScriptTag({
        path: './dist/build/page2layers.bundle.js'
    });

    const asketchPage = await page.evaluate(('page2layers.run()'));

    fs.writeFileSync(
        path.resolve(__dirname, outputFile),
        JSON.stringify(asketchPage)
    );

    if (!!!DEBUG) {
        await browser.close();
    }
});
