


define(function () {
    /**
     *  Checks if the string starts with substring.
     * @param {String} s 字符串
     * @param {String} start 字符串
     * @return {Boolean}
     */
    return function (s, start) {
        if (start === '') {
            return true;
        }
        if (s == null || start == null) {
            return false;
        }
        return String(s).indexOf(String(start)) === 0;
    };
});
