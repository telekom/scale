/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const express = require('express');
const handlebars = require('express-handlebars');
const sanitize = require("sanitize-filename");

const PORT = 5005;
const app = express();

app.engine(
  'hbs',
  handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./config/handlebars-helpers')
  })
);

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:component', (req, res) => {
  try {
    res.render(sanitize(req.params.component), {
      title: sanitize(req.params.component)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    });
  } catch (error) {
    res.render('error', { error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`The web server has started on http://localhost:${PORT}`);
});
