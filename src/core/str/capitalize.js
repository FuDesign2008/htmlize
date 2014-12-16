


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
        s = String(s);
        return s.charAt(0).toUpperCase() + s.substr(1);
    };
});
