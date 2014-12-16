

define(function (require) {
    var TRIM = require('./trim');

    return function (str) {
        return TRIM(str).replace(/([A-Z])/g, '-$1').replace(/[\-_\s]+/g,
            '-').toLowerCase();
    };

});
