if (typeof require !== "undefined") {
    require.extensions[".less"] = () => {};
    require.extensions[".css"] = (file) => {};
}
const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css');

module.exports = withTypescript(withCSS());
