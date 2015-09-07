/**
 *
 *
 * @author fuyg
 * @date  2014-12-16
 */
define(function (require) {
    var TRIM = require('../core/str/trim'),
        STARTS_WITH = require('../core/str/startsWith'),
        _ = require('../core/underscore'),
        /**
         * @param {String} line
         * @return {Integer} level >= 1
         *
         */
        countListLevel = function (line) {
            // \s 空格
            // \t 制表符
            // \xA0 non-breaking spaces
            // \u3000中文空格
            var matched = /^[\s\t\xA0\u3000]+/.exec(line),
                index,
                len,
                counter = 0,
                oneChar;

            if (!matched) {
                return 1;
            }

            matched = matched[0];
            len = matched.length;
            for (index = 0; index < len; index++) {
                oneChar = matched.charAt(index);
                if (oneChar === '\t') {
                    counter += 4;
                } else {
                    counter += 1;
                }
            }

            counter = Math.ceil(counter / 4) + 1;

            return counter < 1 ? 1 : counter;
        },
        /**
         * @param {String} content
         * @param {Array<Object>} parts
         * @return {Array<Object>}
         */
        concatUrl= function (content, parts) {
            var arrContent = [],
                start = 0,
                endText;

            _.each(parts, function (part) {
                var text = content.substring(start, part.index),
                    link = '<a href="' + _.escape(part.full) + '">' +
                        _.escape(part.text) +  '</a>';
                if (text && text.length) {
                    arrContent.push({
                        content: text,
                        plain: true
                    });
                }

                arrContent.push({
                    content: link,
                    plain: false
                });

                start = part.index + part.size;
            });

            endText = content.substring(start);

            if (endText && endText.length) {
                arrContent.push({
                    content: endText,
                    plain: true
                });
            }

            if (arrContent && arrContent.length) {
                return arrContent;
            }

            return [{
                content: content,
                plain: true
            }];

        },
        /**
         * @param {String} text
         * @return {Array}
         */
        parseUrl = function (text) {
            text = text + '';
            /*jshint maxlen: 100*/
            var urlReg = /(https?:\/\/|www\.|ssh:\/\/|ftp:\/\/)[a-z0-9&_+\-\?\/\.=\#,:@]+/ig,
                matched,
                arrMatched,
                url;


            arrMatched = [];

            matched = urlReg.exec(text);
            while (matched) {
                url = matched[0];
                arrMatched.push({
                    index: matched.index,
                    size: url.length,
                    text: url,
                    full: STARTS_WITH(url.toLowerCase(), 'www.') ?
                        ('http://' + url) : url
                });
                matched = urlReg.exec(text);
            }

            if (arrMatched && arrMatched.length) {
                return concatUrl(text, arrMatched);
            }

            return [{
                content: text,
                plain: true
            }];
        },
        parseMail = function (text) {
            text = text + '';
            var mailReg = /[a-z0-9_+\-\.]+@[a-z0-9_+\-\.]+/ig,
                matched,
                arrMatched,
                address;


            arrMatched = [];

            matched = mailReg.exec(text);
            while (matched) {
                address = matched[0];
                arrMatched.push({
                    index: matched.index,
                    size: address.length,
                    text: address,
                    full: 'mailto:' + address

                });
                matched = mailReg.exec(text);
            }

            if (arrMatched && arrMatched.length) {
                return concatUrl(text, arrMatched);
            }

            return [{
                content: text,
                plain: true
            }];
        },
        /**
         * @param {Array<Object>} arrContent
         * @param {Function} partParser
         * @return {Array<Object>}
         */
        parseInline = function (arrContent, partParser) {
            arrContent = _.flatten(arrContent);

            var newArrContent = [];

            _.each(arrContent, function (contentObj) {
                if (!contentObj || !contentObj.content) {
                    return;
                }
                if (contentObj.plain) {
                    newArrContent.push(partParser(contentObj.content));
                } else {
                    newArrContent.push(contentObj);
                }
            });

            newArrContent = _.flatten(newArrContent);

            return newArrContent;
        };

    return {
        /**
         * @param {String} line
         * @return {Array<Object>} {content: 'string', plain: 'boolean'}
         */
        blankLine: function (line) {
            var trimmed = TRIM(line);

            if (!trimmed) {
                return [{
                    content: '<br/>',
                    plain: false
                }];
            }
        },
        horizotalLine: function (line) {
            var reg = /^\s*-{3,}\s*$/;

            if (reg.test(line)) {
                return [{
                    content: '<hr/>',
                    plain: false
                }];
            }
        },
        inline: function (line) {
            line = line + '';

            var arrContent = [{
                    content: line,
                    plain: true
                }];

            arrContent = parseInline(arrContent, parseUrl);
            arrContent = parseInline(arrContent, parseMail);

            return arrContent;
        },
        /**
         * @param {String} line
         * @param {Boolean} [_orderList = true]
         * @return {Array<Object>} {content: 'string', plain: 'boolean'}
         */
        orderList: function (line, _orderList) {

            _orderList = _orderList !== false;

            var that = this,
                trimmed = TRIM(line),
                signReg = _orderList? /\d+\.?\s+/ : /[-*]\s+/,
                matched = signReg.exec(trimmed),
                matchedText,
                arrContent,
                level,
                textContent,
                parsed;

            if (!matched) {
                return;
            }

            level = countListLevel(line);

            arrContent = [{
                content: '<li>',
                plain: false,
                level: level,
                orderList: _orderList
            }];

            matchedText = matched[0];
            textContent = trimmed.substring(matchedText.length);

            parsed = that.inline(textContent);

            if (parsed) {
                arrContent.push(parsed);
            } else {
                arrContent.push({
                    content: textContent,
                    plain: true
                });
            }

            arrContent.push({
                content: '</li>',
                plain: false
            });

            return _.flatten(arrContent);
        },
        unorderList: function (line) {
            var that = this;
            return that.orderList(line, false);
        }

    };
});
