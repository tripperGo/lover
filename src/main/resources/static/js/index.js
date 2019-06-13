(function ($) {
    // 加载区块数据
    initPrefecture();

    // 加载活动计划数据
    initPlanning();
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
                    "                    <img class='img-index-layout img-index-layout-shadow' src=\'" + item.appender + "\' alt=\"...\">\n" +
                    "                    <div>" + item.value + "</div>\n" +
                    "                </a>\n" +
                    "            </div>";
                $(".card-prefecture-parent").append(prefectureHtml);
            }
        }
    });
}

function initPlanning() {
    $.ajax({
        url: "index/dic/planning",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            for (var index in data) {
                var item = data[index];
                var planningHtml = "<div class=\"col-xs-6 col-md-3\">\n" +
                    "                <a href=\"/planning.html?key=" + item.key + "\" class=\"thumbnail text-center\">\n" +
                    "                    <img class='img-index-layout-shadow' src=\'" + item.appender + "\' alt=\"...\">\n" +
                    "                    <div>" + item.value + "</div>\n" +
                    "                </a>\n" +
                    "            </div>";
                $(".card-planning-parent").append(planningHtml);
            }
        }
    });
}