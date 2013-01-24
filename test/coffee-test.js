var BORSCHIK = require('borschik'),
    FS = BORSCHIK.require('./fs'),
    PATH = require('path'),
    ASSERT = require('assert');

/**
 * Mocha BDD interface.
 */
/** @name describe @function */
/** @name it @function */
/** @name before @function */
/** @name after @function */
/** @name beforeEach @function */
/** @name afterEach @function */

function readFile(path) {
    return FS.readFileSync(PATH.resolve(__dirname, path));
}

function testJS(tech, dir, inPath, outPath, okPath) {
    inPath = PATH.resolve(PATH.join(__dirname, dir, inPath));
    outPath = PATH.resolve(PATH.join(__dirname, dir, outPath));
    okPath = PATH.resolve(PATH.join(__dirname, dir, okPath));

    before(function() {
        return BORSCHIK.api({ tech: tech, input: inPath, output: outPath, minimize: true });
    });

    it('UglifyJS, tech ' + tech + ' ok', function() {
        ASSERT.equal(readFile(outPath).toString(), readFile(okPath).toString());
    });

    after(function() {
        FS.unlinkSync(outPath);
    });
}

describe('UglifyJS yes, tech coffee', function() {
    testJS(require('..'), 'uglifyjs_test', 'test.coffee', '_test.js', 'ok_jscoffee.js');
});
