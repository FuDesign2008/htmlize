


define(function () {
    /**
     * Checks if the string ends with substring.
     * @param {String} s 字符串
     * @param {String} end 字符串
     * @return {Boolean}
     */
    return function (s, end) {
        if (end === '') {
            return true;
        }
        if (end == null || s == null) {
            return false;
        }
        var i = s.length - end.length;
        return i >= 0 && s.indexOf(end, i) === i;
    };
});
