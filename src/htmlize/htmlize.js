/**
 *
 *
 * @author fuyg
 * @date  2014-12-16
 */

define(function (require) {
    var _ = require('../core/underscore'),
        PARSE = require('./parse'),
        TIMES = require('../core/str/times'),
        console = require('../core/console'),
        htmlize;

    /**
     * @param {String} str  字符串
     * @param {Document} [context = document]
     * @return {String}
     **/
    /*jshint maxstatements:false, maxdepth:5 */
    htmlize = function (str) {
        var lines,
            linesData,
            html = '',
            index,
            len,
            arrLine,
            arrListEndTag = [],
            listEndTag,
            currentLevel = 0,
            listInfo,
            listTag,
            delta,
            handleContent,
            getListInfo = function (arrLine) {
                if (!arrLine || !arrLine[0]) {
                    return false;
                }
                var contentObj = arrLine[0];
                if (!contentObj || contentObj.plain) {
                    return false;
                }
                if (/<li>/i.test(contentObj.content)) {
                    return {
                        level: contentObj.level,
                        orderList: contentObj.orderList
                    };
                }
                return false;
            };

        if (!str) {
            return '';
        }

        lines = str.split(/\r?\n/);

        linesData = _.map(lines, function (line) {
            return  PARSE.blankLine(line) ||
                PARSE.horizotalLine(line) ||
                PARSE.unorderList(line) ||
                PARSE.orderList(line) ||
                PARSE.inline(line) || [{
                    content: line,
                    plain: true
                }];
        });

        len = linesData.length;

        handleContent = function (contentObj) {
            var txt;
            if (!contentObj || !contentObj.content) {
                return;
            }
            if (contentObj.plain) {
                txt = _.escape(contentObj.content).replace(/ /g, '&nbsp;');
                txt = txt.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                html += txt;
            } else {
                html += contentObj.content;
            }
        };

        for (index = 0; index < len; index++) {
            arrLine =  linesData[index];


            listInfo = getListInfo(arrLine);

            if (listInfo) {
                if (listInfo.level === currentLevel) {
                    console.log('level == currentLevel', arrLine);
                    _.each(arrLine, handleContent);
                } else if (listInfo.level > currentLevel){

                    console.log('level > currentLevel', arrLine);

                    listTag = listInfo.orderList ? 'ol' : 'ul';
                    delta = listInfo.level - currentLevel;

                    html += TIMES('<' + listTag + '>', delta);
                    _.each(arrLine, handleContent);

                    arrListEndTag.push(TIMES('</' + listTag + '>', delta));

                    currentLevel = listInfo.level;
                } else {
                    console.log('level < currentLevel', arrLine);
                    delta = currentLevel - listInfo.level;

                    while(delta > 0) {
                        html += arrListEndTag.pop() || '';
                        delta--;
                    }

                    currentLevel = listInfo.level;

                    _.each(arrLine, handleContent);

                }
            } else {
                if (currentLevel) {

                    listEndTag = arrListEndTag.pop();

                    while(listEndTag) {
                        html += listEndTag;
                        listEndTag = arrListEndTag.pop();
                    }

                }

                html += '<div>';
                _.each(arrLine, handleContent);
                html += '</div>';

                currentLevel = 0;
            }

        }


        return html;

    };

    return {
        htmlize: htmlize
    };
});

