(function ($) {
    initSomething();
})(jQuery);

function initSomething() {
    var params = document.location.toString().split("?");
    if (params && params.length > 0) {
        var keyStr = params[1];
        if (keyStr) {
            var key = keyStr.replace("key=", "");
            if (key) {
                $.ajax({
                    url: "something/list/" + key,
                    data: {},
                    type: "GET",
                    dataType: "JSON",
                    success: function (data) {
                        for(var index in data){
                            var item = data[index];
                            var itemHtml = "<a href=\"#\" class=\"list-group-item\">\n" +
                                item.title +
                                "                <span class=\"badge\">"+item.goOver+"</span>\n" +
                                "            </a>";
                            $(".something-parent").append(itemHtml)
                        }
                    }
                });
            }
        }
    }
}