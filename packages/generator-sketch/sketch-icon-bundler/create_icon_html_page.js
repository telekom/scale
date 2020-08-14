const fs = require('fs');
const Path = require('path');
const { execSync } = require("child_process");

if (process.argv.length < 3) {
	console.error("USAGE: node logoprocessor.js ICON_DIRECTORY");
	process.exit(1);
}

const svgs = execSync(`find ${process.argv[2]} -type f | grep '\.svg$'`).toString().trim().split('\n').sort();

const svgTree = {};

svgs.forEach(fn => {
    const [category, name, state] = fn.split("/").slice(-3);
    if (!svgTree[category]) svgTree[category] = {};
    if (!svgTree[category][name]) svgTree[category][name] = {};
    svgTree[category][name][state] = fn;
});

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

const bufs = [];
bufs.push(fs.readFileSync(Path.join(__dirname, 'header.html')).toString());

for (const category in svgTree) {
    const c = svgTree[category];
    bufs.push(`<div data-sketch-name="${category.toUpperCase()}"><h2>${capitalize(category)}</h2>\n<div>\n`);
    for (const name in c) {
        bufs.push(`\t<div data-sketch-name="${name.toUpperCase()}"><h3>${capitalize(name)}</h3>\n\t<div>\n`);
        const n = c[name];
        for (const state in n) {
            bufs.push(`\t\t<div><h4>${capitalize(state.replace(/\.svg$/ig,''))}</h4>\n\t\t`);
            bufs.push(fs.readFileSync(n[state]).toString().replace(/<svg/, `<svg data-sketch-symbol="icon/${category}/${name}/${state.replace(/\.svg$/ig,'')}"`));
            bufs.push(`\t\t</div>\n\n`);
        }
        bufs.push(`\t</div></div>\n\n`);
    }
    bufs.push(`</div></div>\n\n`);
}

bufs.push(`</body>\n</html>\n`);

console.log(bufs.join(""));
