/**
 *  判断是否为空字符串，支持中文空格，制表符
 * @return {Boolean}
 */



define(function () {
    /**
     * @param {String}
     *            s 字符串
     */
    return function (s) {
        // \s 空格， \t 制表符, \xA0 non-breaking spaces, \u3000中文空格
        return (/^[\s\t\xA0\u3000]*$/).test(String(s));
    };
});
