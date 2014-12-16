


define(function (require) {
    var TRIM = require('./trim');
    /**
     *  Converts a string separated by dashes into a camelCase
     *  equivalent. For instance, "foo-bar" would be converted to
     *  "fooBar".uses this internally for translating CSS properties
     *  into their DOM "style" property equivalents.
     * @param {String} s 字符串
     * @return {String}
     */
    return function (s) {
        if (s == null) {
            return '';
        }
        return TRIM(String(s)).replace(/[\-_\s]+([^\-])?/g,
            function (whole, ch) {
                return ch ? ch.toUpperCase() : '';
            });
    };
});
