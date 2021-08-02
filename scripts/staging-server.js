const http = require('http');
const auth = require('basic-auth');
const compare = require('tsscmp');
const handler = require('serve-handler');

const USERNAME = process.env.HTTP_USERNAME;
const PASSWORD = process.env.HTTP_PASSWORD;
const REALM = process.env.HTTP_REALM || 'Storybook Staging';
const PUBLIC_PATH =
  process.env.HTTP_PUBLIC_PATH || './packages/storybook-vue/storybook-static/';
const PORT = process.env.PORT || 3000;

const server = http.createServer(function (req, res) {
  const credentials = auth(req);

  // HTTP basic auth check
  if (!credentials || !check(credentials)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', `Basic realm="${REALM}"`);
    res.end('Access denied');
    return;
  }

  // Serve static folder
  handler(req, res, { public: PUBLIC_PATH }).catch((err) => {
    throw err;
    process.exit(1);
  });
});

function check({ name, pass }) {
  let valid = true;
  valid = compare(name, USERNAME) && valid;
  valid = compare(pass, PASSWORD) && valid;
  return valid;
}

server.listen(PORT);
