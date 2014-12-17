
(function () {

    var $ = window.jQuery || window.$,
        htmlize = window.htmlize,
        testUrl = './link.txt';

    if (!htmlize) {
        document.body.innerHTML = '<h1>NO window.htmlize</h1>';
        return;
    }

    $.ajax({
        url: testUrl,
        dataType: 'text',
        success: function (data) {
            var html = htmlize.htmlize(data),
                wrapper = document.getElementById('wrapper');

            wrapper.innerHTML = html;

            $('textarea').val(data);

        }
    });

})();
