var arrData = [], timerID = 0;

(function ($) {
    initSomething();
})(jQuery);

function initSomething() {
    arrData = []
    var params = document.location.toString().split("?");
    if (params && params.length > 0) {
        var keyStr = params[1];
        if (keyStr) {
            var key = keyStr.replace("key=", "");
            // if (key) {
            $.ajax({
                url: "something/list/" + key,
                data: {},
                type: "GET",
                dataType: "JSON",
                success: function (data) {
                    for (var index in data) {
                        var item = data[index];
                        arrData.push(item.title)
                        var itemHtml = "<a href=\"#\" class=\"list-group-item\">\n" +
                            item.title +
                            "                <span class=\"badge\">" + item.goOver + "</span>\n" +
                            "            </a>";
                        $(".something-parent").append(itemHtml)
                    }
                }
            });
            // }
        }
    }
}

function getEleById(id) {
    return document.getElementById(id);
}

function Start(btn) {
    if (timerID > 0) {
        clearInterval(timerID);
        timerID = 0;
    }
    if (arrData.length < 1) {
        showAlertSomething("都随机完一遍啦")
        return;
    }
    if (btn.value == "开始") {
        timerID = setInterval(function () {
            getEleById("num").index = parseInt(Math.random() * (arrData.length));
            getEleById("num").innerHTML = arrData[getEleById("num").index];
        }, 70);
        btn.value = "暂停";
        randomStop()
    } else {
        var div = document.createElement("div");
        div.innerHTML = getEleById("num").innerHTML;
        getEleById("result").appendChild(div);
        arrData.splice(getEleById("num").index, 1);
        btn.value = "开始";
    }
}

function randomStop() {
    var randomTime = Math.floor(Math.random() * 5000 + 1);

    showAlertSomething("抽签结果会在5--10s内随机结束")
    setTimeout(function () {
        $("#btnStart").click()
    }, randomTime + 5000);
}

function showAlertSomething(msg) {
    $(".lot-div-main").append("<div class=\"alert alert-danger alert-danger-msg\" role=\"alert\">" + msg + "</div>");
    setInterval(hiddenAlertSomething, 3000);
}

function hiddenAlertSomething() {
    $(".lot-div-main .alert-danger").remove();
}