


define(function () {
    /**
     *  Converts a string as a capitalized string.
     * @param {String} s 字符串
     * @return {String}
     */
    return function (s) {
        if (s == null) {
            return '';
        }
        return String(s).replace(/(?:^|\s)\S/g, function (c) {
            return c.toUpperCase();
        });
    };
});
