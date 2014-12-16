/**
 * A simple console object for debug, only has these properties:
 *  + DEBUG
 *  + log()
 *  + warn()
 *  + error()
 *
 * If you want to has advanced one, you can use a dapter to rewrite it.
 *
 * Please Make sure this module is *independent* and *simple*.
 *
 * @author fuyg
 * @date   2013-05-21
 * @time   下午12:17:24
 */




define(function () {

    var global = this,
        nativeConsole,
        noop = function () {},
        retObj = {
            DEBUG: false,
            EXPORTS: global.JTK_EXPORTS || {},
            log: noop,
            warn: noop,
            error: noop
        };
    // If not in debug mode, just return
    if (global.DEBUG !== true) {
        return retObj;
    }

    if (global.console && global.console.log) {
        nativeConsole = global.console;
    } else {
        return retObj;
    }

    retObj.DEBUG = true;

    try {
        retObj.log = nativeConsole.log.bind(nativeConsole);
        retObj.warn = nativeConsole.warn.bind(nativeConsole);
        retObj.error = nativeConsole.error.bind(nativeConsole);
    } catch (ex) {
        /**
         */
        retObj.log = function () {
            var msg = [],
                index,
                len = arguments.length;
            // fn.apply will cause error in IE
            for (index = 0; index < len; index++) {
                msg.push(String(arguments[index]));
            }
            nativeConsole.log(msg.join(';'));
        };
        /**
         * @param {String|Object}  msg
         * @param {String}  [fileName]
         */
        retObj.warn = function (msg, fileName) {
            var that = this;
            fileName = fileName ? ('[' + fileName + ']') : '';
            that.log(fileName + 'WARN: ' + msg + '.');
            //export warning
            if (typeof msg === 'object') {
                throw msg;
            }
        };
        /**
         * @param {String|Object}  msg
         * @param {String}  [fileName]
         */
        retObj.error = function (msg, fileName) {
            var that = this;
            fileName = fileName ? ('[' + fileName + ']') : '';
            that.log(fileName + 'ERROR: ' + msg + '!');
            //export error
            if (typeof msg === 'object') {
                throw msg;
            }
        };

    }

    return retObj;

});
