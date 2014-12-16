

define(function (require) {
    var console = require('./console'),
        _ = this._ || this.underscore;

    if (!_) {
        console.error('no underscore library', 'underscore.js');
        return;
    }

    //默认保留暴露window._
    //除非设置了window.JTK_EXPORTS.underscore = false
    if (console.EXPORTS.underscore === false && _.noConflict) {
        _ = _.noConflict();
    }

    return _;


});
