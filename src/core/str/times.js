


define(function () {
    /**
     *  Concatenates the string count times.
     * @param {String} str 字符串
     * @param {Integer} times
     * @return {String}
     */
    return function (str, times) {
        if (str == null || str === '' || isNaN(times)) {
            return '';
        }
        return times < 1 ? '' : new Array(times + 1).join(String(str));
    };
});
