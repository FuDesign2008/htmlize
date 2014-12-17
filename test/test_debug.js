
define(function (require) {

    var $ = window.jQuery || window.$,
        console = require('../src/core/console'),
        HTMLIZE = require('../src/htmlize/htmlize'),
        testUrl = './link.txt';

    $.ajax({
        url: testUrl,
        dataType: 'text',
        success: function (data) {
            var html = HTMLIZE.htmlize(data),
                wrapper = document.getElementById('wrapper');

            console.log(html);

            wrapper.innerHTML = html;

            $('textarea').val(data);

        }
    });

});
