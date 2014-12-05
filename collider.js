/*
 * this file should be invoked like this:
 *
 * ```js
 * node collider patch.js original-test.js --original-opts
 * ```
 */
(function () {
  var fs = require('fs'),
      path = require('path');

  var files = process.argv.slice(2, 4);

  // preserve arguments
  process.argv.splice(1, 2);
  process.argv[1] = path.resolve(process.argv[1]);

  // TODO: fix the state of other globals like `__dirname` and `__filename`

  files.forEach(function (fileName) {
    require(path.resolve(fileName));
  });
}());
