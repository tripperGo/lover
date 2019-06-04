(function ($) {
    // 加载区块数据
    listSomething();
})(jQuery);

function listSomething() {
    $(".something-table-tr").remove();
    $.ajax({
        url: "something/listAll",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            for (var index in data) {
                var item = data[index];
                var userHtml = "<tr class='something-table-tr'>\n" +
                    "<td>" + item.title + "</td>\n" +
                    "<td>" + item.familyName + "</td>\n" +
                    "<td>" + item.prefectureValue + "</td>\n" +
                    "<td>" + item.startTimeStr + "</td>\n" +
                    "<td>" + item.endTimeStr + "</td>\n" +
                    "<td>" + item.goOver + "</td>\n" +
                    "<td>\n" +
                    "    <button class=\"btn btn-warning \" data-toggle=\"modal\" onclick='modelBoxSomething(" + JSON.stringify(item) + ")' data-target=\"#myModal_user\">修改</button>\n" +
                    "    <button class=\"btn btn-danger \" data-toggle=\"modal\" onclick='deleteSomething(" + item.id + ")' data-target=\"\">删除</button>\n" +
                    "</td>\n" +
                    " </tr>";
                $(".something-table").append(userHtml);
            }
        }
    });
}

function deleteSomething(id) {
    if (id) {
        $.ajax({
            url: "something/delete",
            data: {
                id:id
            },
            type: "GET",
            dataType: "text",
            success: function (data) {
                showAlertSomething(data)
                listSomething()
            }
        });
    } else {
        showAlertSomething("必须有id值")
    }
}

function showAlertSomething(msg) {
    $(".div-alert-parent").append("<div class=\"alert alert-success\" role=\"alert\">" + msg + "</div>");
    setInterval(hiddenAlertSomething, 3000);
}

function hiddenAlertSomething() {
    $(".div-alert-parent .alert-success").remove();
}

function modelBoxSomething(item) {
    var id = item.id;
    var title = item.title;
    var familyId = item.familyId;
    var familyName = item.familyName;
    var prefectureKey = item.prefectureKey;
    var prefectureValue = item.prefectureValue;
    var startTimeStr = item.startTimeStr;
    var endTimeStr = item.endTimeStr;

    $("#myModal_user .modal-dialog").empty();
    var html = "<div class=\"modal-dialog\">\n" +
        " <div class=\"modal-content\">\n" +
        "     <div class=\"modal-header\">\n" +
        "         <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;\n" +
        "         </button>\n" +
        "         <h4 class=\"modal-title\">修改事情 " + title + "</h4>\n" +
        "     </div>\n" +
        "     <div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "<input type='hidden' id='something_id_single' value='" + id + "'/>" +
        "             <span class=\"input-group-addon\" id=\"username_field\">标题</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='something-title' placeholder=\"" + title + "\" aria-describedby=\"basic-addon1\" value=\"" + title + "\">\n" +
        "         </div>\n" +
        "         <div id='family-select' class=\"input-group field-param family-select\">\n" +
        "             <span class=\"input-group-addon\" id=\"family_field_something\">所属家庭</span>\n" +
        "         </div>\n" +
        "         <div id='prefecture-select' class=\"input-group field-param prefecture-select\">\n" +
        "             <span class=\"input-group-addon\" id=\"prefecture_field_something\">所属区块</span>\n" +
        "         </div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "             <span class=\"input-group-addon\" id=\"password_field\">开始时间</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='start_time_id' placeholder=\"" + startTimeStr + "\" aria-describedby=\"basic-addon1\" value=\"" + startTimeStr + "\">\n" +
        "         </div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "             <span class=\"input-group-addon\" id=\"password_field\">结束时间</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='end_time_id' placeholder=\"" + endTimeStr + "\" aria-describedby=\"basic-addon1\" value=\"" + endTimeStr + "\">\n" +
        "         </div>\n" +
        "     </div>\n" +
        "     <div class=\"modal-footer\">\n" +
        "       <button type=\"button\" class=\"btn btn-default\" id='close-model' data-dismiss=\"modal\">关闭</button>\n" +
        "       <input type='hidden' id='familyId' value='" + item.id + "'>" +
        "        <button type=\"button\" onclick='submitSomething()' class=\"btn btn-primary\">提交更改</button>\n" +
        "        </div>\n" +
        "    </div><!-- /.modal-content -->\n" +
        "</div>";
    $("#myModal_user").append(html);
    loadSomethingSelect(familyId, familyName);
    loadSomethingPrefecture(prefectureKey, prefectureValue);
}

function submitSomething() {
    var id = $("#something_id_single").val();
    var title = $("#something-title").val();
    var familyId = $("#something_family_id_single").val();
    var prefecture = $("#prefecture_key_single").val();
    var startTime = $("#start_time_id").val();
    var endTime = $("#end_time_id").val();

    $.ajax({
        url: "something/update",
        data: {
            id: id,
            title: title,
            familyId: familyId,
            prefectureKey: prefecture,
            startTimeStr: startTime,
            endTimeStr: endTime
        },
        type: "POST",
        dataType: "text",
        success: function (data) {
            showAlertSomething(data)
            $("#close-model").click()
            listSomething()
        }
    });

}

function loadSomethingPrefecture(prefectureKey, prefectureValue) {
    $.ajax({
        url: "index/dic/prefecture",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var ulList = "";
            for (var index in data) {
                var item = data[index];
                var value = item.value;
                ulList += "<li><a onclick='changePrefecture(" + JSON.stringify(item) + ")' href=\"javascript:void(0)\">" + value + "</a></li>";
            }
            var PrefectureMenu = "<div class=\"dropdown\">\n" +
                "            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n" +
                "<span id='prefecture_key_name_single'>" + prefectureValue + "</span>" +
                "<input type='hidden' id='prefecture_key_single' value='" + prefectureKey + "'/>" +
                "                <span class=\"caret\"></span>\n" +
                "            </button>\n" +
                "            <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n" +
                ulList +
                "            </ul>\n" +
                "        </div>";
            $("#prefecture-select").append(PrefectureMenu);
        }
    });
}

function loadSomethingSelect(familyId, familyName) {
    $.ajax({
        url: "family/list",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var ulList = "";
            for (var index in data) {
                var item = data[index];
                var familyNameFor = item.familyName;
                ulList += "<li><a onclick='changeFamily(" + JSON.stringify(item) + ")' href=\"javascript:void(0)\">" + familyNameFor + "</a></li>";
            }
            var familyMenu = "<div class=\"dropdown\">\n" +
                "            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n" +
                "<span id='family_name_single'>" + familyName + "</span>" +
                "<input type='hidden' id='something_family_id_single' value='" + familyId + "'/>" +
                "                <span class=\"caret\"></span>\n" +
                "            </button>\n" +
                "            <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n" +
                ulList +
                "            </ul>\n" +
                "        </div>";
            $("#family-select").append(familyMenu);
        }
    });
}

function changeFamily(item) {
    $("#family_name_single").text(item.familyName);
    $("#something_family_id_single").val(item.id);
}

function changePrefecture(item) {
    console.log(item)
    $("#prefecture_key_name_single").text(item.value);
    $("#prefecture_key_single").val(item.key);
}

function addSomething() {
    $("#myModal_user .modal-dialog").empty();
    var html = "<div class=\"modal-dialog\">\n" +
        " <div class=\"modal-content\">\n" +
        "     <div class=\"modal-header\">\n" +
        "         <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;\n" +
        "         </button>\n" +
        "         <h4 class=\"modal-title\">增加一起做的事情</h4>\n" +
        "     </div>\n" +
        "     <div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "<input type='hidden' id='something_id_single' value=''/>" +
        "             <span class=\"input-group-addon\" id=\"username_field\">标题</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='something-title' placeholder=\"\" aria-describedby=\"basic-addon1\" value=\"\">\n" +
        "         </div>\n" +
        "         <div id='family-select' class=\"input-group field-param family-select\">\n" +
        "             <span class=\"input-group-addon\" id=\"family_field_something\">所属家庭</span>\n" +
        "         </div>\n" +
        "         <div id='prefecture-select' class=\"input-group field-param prefecture-select\">\n" +
        "             <span class=\"input-group-addon\" id=\"prefecture_field_something\">所属区块</span>\n" +
        "         </div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "             <span class=\"input-group-addon\" id=\"password_field\">开始时间</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='start_time_id' placeholder=\"2019-05-26 18:00:00\" aria-describedby=\"basic-addon1\" value=\"2019-05-26 18:00:00\">\n" +
        "         </div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "             <span class=\"input-group-addon\" id=\"password_field\">结束时间</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='end_time_id' placeholder=\"2019-05-26 18:00:00\" aria-describedby=\"basic-addon1\" value=\"2019-05-26 18:00:00\">\n" +
        "         </div>\n" +
        "     </div>\n" +
        "     <div class=\"modal-footer\">\n" +
        "       <button type=\"button\" class=\"btn btn-default\" id='close-model' data-dismiss=\"modal\">关闭</button>\n" +
        "       <input type='hidden' id='familyId' value=''>" +
        "        <button type=\"button\" onclick='submitSomething()' class=\"btn btn-primary\">提交更改</button>\n" +
        "        </div>\n" +
        "    </div><!-- /.modal-content -->\n" +
        "</div>";
    $("#myModal_user").append(html);
    loadSomethingSelect("", "");
    loadSomethingPrefecture("", "");
}