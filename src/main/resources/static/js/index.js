(function ($) {
    // 加载区块数据
    initPrefecture();
})(jQuery);

function initPrefecture() {
    $.ajax({
        url: "index/dic/prefecture",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            for (var index in data) {
                var item = data[index];
                var prefectureHtml = "<div class=\"col-xs-6 col-md-3\">\n" +
                    "                <a href=\"/something.html?key=" + item.key + "\" class=\"thumbnail\">\n" +
                    "                    <img src=\'" + item.appender + "\' alt=\"...\">\n" +
                    "                    <div>" + item.value + "</div>\n" +
                    "                </a>\n" +
                    "            </div>";
                $(".card-prefecture-parent").append(prefectureHtml);
            }
        }
    });
}
