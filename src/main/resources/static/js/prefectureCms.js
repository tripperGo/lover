(function ($) {
    // 加载区块数据
    listPrefecture();
})(jQuery);

function listPrefecture() {
    $(".prefecture-table-tr").remove();
    $.ajax({
        url: "index/allDic/prefecture",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            for (var index in data) {
                var item = data[index];
                var status = item.status;
                console.log(status)
                status = status === 1 ? "可用" : "禁用";
                console.log(status)
                var prefectureHtml = "<tr class='prefecture-table-tr'>\n" +
                    "                        <td>" + item.value + "</td>\n" +
                    "                        <td>" + item.key + "</td>\n" +
                    "                        <td>" + status + "</td>\n" +
                    "                        <td>" + item.sort + "</td>\n" +
                    "                        <td width=\"50px\">\n" +
                    "                            <img src=\"https://ss.csdn.net/p?https://mmbiz.qpic.cn/mmbiz_jpg/BnSNEaficFAYq7FiaHgyMc1aIyYPkmKI65EMNmmUViaDeuR4BJjYjDiaLxI8pjNKtmJMia1GrlHcUEDH3murbKfK1hA/640?wx_fmt=jpeg\"/>\n" +
                    "                        </td>\n" +
                    "                        <td>\n" +
                    "                            <button class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" onclick='modelBox(" + JSON.stringify(item) + ")' data-target=\"#myModal\">修改\n" +
                    "                            </button>\n" +
                    "                            <button class=\"btn btn-primary btn-sm\" data-toggle=\"modal\" onclick='deletePrefecture(" + item.id + ")' data-target=\"\">删除</button>\n" +
                    "                        </td>\n" +
                    "                    </tr>";
                $(".prefecture-table").append(prefectureHtml);
            }
        }
    });
}

function modelBox(item) {
    var status = item.status;
    var statusHtml;
    if (status === 1) {
        statusHtml = "                                        <label class=\"radio-inline\">\n" +
            "                                            <input type=\"radio\" name=\"prefecture_status\" value=\"1\" checked> 启用\n" +
            "                                        </label>\n" +
            "                                        <label class=\"radio-inline\">\n" +
            "                                            <input type=\"radio\" name=\"prefecture_status\" value=\"0\"> 禁用\n" +
            "                                        </label>\n";
    } else {
        statusHtml = "                                        <label class=\"radio-inline\">\n" +
            "                                            <input type=\"radio\" name=\"prefecture_status\" value=\"1\"> 启用\n" +
            "                                        </label>\n" +
            "                                        <label class=\"radio-inline\">\n" +
            "                                            <input type=\"radio\" name=\"prefecture_status\" value=\"0\" checked> 禁用\n" +
            "                                        </label>\n";
    }

    $("#myModal .modal-dialog").empty();
    var html = "<div class=\"modal-dialog\">\n" +
        "                        <div class=\"modal-content\">\n" +
        "                            <div class=\"modal-header\">\n" +
        "                                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;\n" +
        "                                </button>\n" +
        "                                <h4 class=\"modal-title\" id=\"myModalLabel\">修改" + item.value + "</h4>\n" +
        "                            </div>\n" +
        "                            <div>\n" +
        "                                <div class=\"input-group field-param\">\n" +
        "                                    <span class=\"input-group-addon\" id=\"prefecture_value\">专区名称</span>\n" +
        "                                    <input type=\"text\" class=\"form-control\" id='prefecture_value_input' placeholder=\"免费专区\" aria-describedby=\"basic-addon1\" value=\"" + item.value + "\">\n" +
        "                                </div>\n" +
        "                                <div class=\"input-group field-param\">\n" +
        "                                    <span class=\"input-group-addon\" id=\"prefecture_key\">专区唯一键</span>\n" +
        "                                    <input type=\"text\" class=\"form-control\" id='prefecture_key_input' placeholder=\"1\" aria-describedby=\"basic-addon1\" value=\"" + item.key + "\">\n" +
        "                                </div>\n" +
        "                                <div class=\"input-group field-param\">\n" +
        "                                    <span class=\"input-group-addon\" id=\"prefecture_status\">启用状态</span>\n" +
        "                                    <div class=\"field-param-status\">\n" +
        statusHtml +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"input-group field-param\">\n" +
        "                                    <span class=\"input-group-addon\" id=\"prefecture_sort\">排序</span>\n" +
        "                                    <input type=\"text\" class=\"form-control\" id='prefecture_sort_input' placeholder=\"1\" aria-describedby=\"basic-addon1\" value=\"" + item.sort + "\">\n" +
        "                                </div>\n" +
        "                                <div class=\"input-group field-param field-param_img\">\n" +
        "                                    <span class=\"input-group-addon\" id=\"prefecture_img\">区块图片</span>\n" +
        "                                    <img id='prefecture_img_input' src='" + item.appender + "'/>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "\n" +
        "                            <div class=\"modal-footer\">\n" +
        "                                <button type=\"button\" class=\"btn btn-default\" id='close-model' data-dismiss=\"modal\">关闭</button>\n" +
        "<input type='hidden' id='prefectureId' value='" + item.id + "'>" +
        "                                <button type=\"button\" onclick='submitPrefecture()' class=\"btn btn-primary\">提交更改</button>\n" +
        "                            </div>\n" +
        "                        </div><!-- /.modal-content -->\n" +
        "                    </div>";

    $("#myModal").append(html);
}

function submitPrefecture() {
    var id = $("#prefectureId").val();
    var value = $("#prefecture_value_input").val();
    var key = $("#prefecture_key_input").val();
    var status = $('.field-param-status input:radio:checked').val();
    var sort = $("#prefecture_sort_input").val();
    var img = $("#prefecture_img_input")[0].src

    $("#close-model").click();

    $.ajax({
        url: "prefecture/update",
        data: {
            id: id,
            key: key,
            value: value,
            status: status,
            sort: sort,
            appender: img
        },
        type: "POST",
        dataType: "text",
        success: function (data) {
            showAlert(data);
            listPrefecture();
        }
    });
}

function showAlert(msg) {
    $(".div-alert-parent").append("<div class=\"alert alert-success\" role=\"alert\">" + msg + "</div>");
    setInterval(hiddenAlert, 3000);
}

function hiddenAlert() {
    $(".div-alert-parent .alert-success").remove();
}

function deletePrefecture(id) {
    if (id) {
        $.ajax({
            url: "prefecture/delete",
            data: {
                id: id
            },
            type: "GET",
            dataType: "text",
            success: function (data) {
                showAlert(data);
                listPrefecture();
            }
        });
    } else {
        showAlert("id不能为空哦");
    }
}