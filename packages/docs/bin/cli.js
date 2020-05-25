#!/usr/bin/env node
const yargs = require('yargs');
const cli = require('../cli');

cli(yargs).parse();
