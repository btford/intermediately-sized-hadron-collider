#!/usr/bin/env node

var path = require('path');
var microcosm = require('./microcosm');

var patch = process.argv[2];

var fs = require('fs');

fs.readdirSync('./node_modules').forEach(function (moduleName) {
  microcosm(moduleName, path.resolve(patch), console.log.bind(console));
});

