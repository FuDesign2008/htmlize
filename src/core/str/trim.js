


define(function () {
    /**
     *  (Strips all leading and trailing whitespace from a string)
     * @param {String} s 字符串
     * @return {String}
     */
    return function (s) {
        if (s == null || s === '') {
            return '';
        }
        // \s 空格
        // \t 制表符
        // \xA0 non-breaking spaces
        // \u3000中文空格
        return String(s).replace(/^[\s\t\xA0\u3000]+/, '')
                .replace(/[\s\t\xA0\u3000]+$/, '');
    };
});
