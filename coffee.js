var PATH = require('path');
var COFFEE = require('coffee-script');

var base = require('borschik').getTech('js');

exports.Tech = base.Tech._inherit({

    File: exports.File = base.File._inherit({

        parseInclude: function(content) {

            if (Buffer.isBuffer(content)) content = content.toString('utf8');

            return PATH.extname(this.path) === '.coffee'?
                this.__base(COFFEE.compile(content, { filename: this.path })) :
                this.__base.apply(this, arguments);

        }

    })

});
