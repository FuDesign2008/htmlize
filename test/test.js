
(function () {

    var $ = window.jQuery || window.$,
        plainize = window.plainize,
        testUrl = './huxiu.txt';

    if (!plainize) {
        document.body.innerHTML = '<h1>NO window.plainize</h1>';
        return;
    }

    $.ajax({
        url: testUrl,
        dataType: 'text',
        success: function (data) {
            var plainized = plainize.plainize(data, {}),
                $textarea = $('textarea', document.body),
                $wrapper = $('#wrapper'),
                parsed = plainize.parseHTML(data, document, true);

            $(parsed).find('script').remove();

            $(parsed).appendTo($wrapper);

            $textarea.text(plainized).css({
                height: $wrapper.height()
            });

        }
    });

})();
