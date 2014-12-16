/**
 *
 *
 * @author fuyg
 * @date  2014-12-16
 */

define(function (require) {
    var _ = require('../core/underscore'),
        console = require('../core/console'),
        PARSE = require('./parse'),
        htmlize;

    /**
     * @param {String} str  字符串
     * @param {Document} [context = document]
     * @return {String}
     *
     **/
    htmlize = function (str) {
        var lines,
            linesData;

        if (!str) {
            return '';
        }

        lines = str.split(/\r?\n/);

        linesData = _.map(lines, function (line) {
            return  PARSE.blankLine(line) ||
                PARSE.unorderList(line) ||
                PARSE.orderList(line) ||
                PARSE.inline(line) || [{
                    content: line,
                    plain: true
                }];
        });

        console.log(linesData);

    };

    return htmlize;
});

