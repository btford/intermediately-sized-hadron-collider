var exec = require('child_process').exec;

/*
 * runs the tests with and without the patch in parallel
 * then compares their output
 */
module.exports = function (moduleToTest, patchToTest, cb) {
  var packageJson = require('./node_modules/' + moduleToTest + '/package.json');

  var testScript = packageJson.scripts && packageJson.scripts.test;

  if (!testScript || testScript === "echo \"Error: no test specified\" && exit 1") {
    throw new Error('Module "' + moduleToTest + '" looks like it has no tests');
  }

  var parts = testScript.split(' ');
  if (parts[0] !== 'node') {
    // TODO: need to be able to run tests that run with a different command
    throw new Error('idk how to patch these tests');
  }

  var colliderCommand = 'node ' + patchToTest + ' ' + parts.slice(1).join(' ');
  var options = { cwd: __dirname + '/node_modules/' + moduleToTest };

  var originalOut,
      colliderOut;

  console.log('running', testScript);
  exec(testScript, options,
    function (error, stdout, stderr) {
      originalOut = [error, stdout, stderr].join('\n');
      finish();
    });

  console.log('running', colliderCommand);
  exec(colliderCommand, options,
    function (error, stdout, stderr) {
      colliderOut = [error, stdout, stderr].join('\n');
      finish();
    });

  function finish () {
    if (originalOut && colliderOut) {
      cb(originalOut === colliderOut ? null : {
        originalOut: originalOut,
        colliderOut: colliderOut
      });
    }
  }
}

