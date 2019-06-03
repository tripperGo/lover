(function ($) {
    // 加载区块数据
    listFamily();
})(jQuery);

function listFamily() {
    $(".family-table-tr").remove();
    $.ajax({
        url: "family/list",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            for (var index in data) {
                var item = data[index];
                var prefectureHtml = "<tr class='family-table-tr'>\n" +
                    "                        <td>" + item.familyName + "</td>\n" +
                    "                        <td>\n" +
                    "                            <button class=\"btn btn-warning \" data-toggle=\"modal\" onclick='modelBox(" + JSON.stringify(item) + ")' data-target=\"#myModal_family\">修改\n" +
                    "                            </button>\n" +
                    "                            <button class=\"btn btn-danger \" data-toggle=\"modal\" onclick='deleteFamily(" + item.id + ")' data-target=\"\">删除</button>\n" +
                    "                        </td>\n" +
                    "                    </tr>";
                $(".family-table").append(prefectureHtml);
            }
        }
    });
}

function modelBox(item) {
    var id = item.id;
    var familyName = item.familyName;
    if (id && familyName) {
        $("#myModal_family .modal-dialog").empty();
        var html = "<div class=\"modal-dialog\">\n" +
            "                        <div class=\"modal-content\">\n" +
            "                            <div class=\"modal-header\">\n" +
            "                                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;\n" +
            "                                </button>\n" +
            "                                <h4 class=\"modal-title\">修改家庭 " + familyName + "</h4>\n" +
            "                            </div>\n" +
            "                            <div>\n" +
            "                                <div class=\"input-group field-param\">\n" +
            "                                    <span class=\"input-group-addon\" id=\"familyName_field\">家庭名称</span>\n" +
            "                                    <input type=\"text\" class=\"form-control\" id='familyName_id' placeholder=\"" + familyName + "\" aria-describedby=\"basic-addon1\" value=\"" + familyName + "\">\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <div class=\"modal-footer\">\n" +
            "                                <button type=\"button\" class=\"btn btn-default\" id='close-model' data-dismiss=\"modal\">关闭</button>\n" +
            "<input type='hidden' id='familyId' value='" + item.id + "'>" +
            "                                <button type=\"button\" onclick='submitFamily()' class=\"btn btn-primary\">提交更改</button>\n" +
            "                            </div>\n" +
            "                        </div><!-- /.modal-content -->\n" +
            "                    </div>";

        $("#myModal_family").append(html);
    }
}

function submitFamily() {
    var familyId = $("#familyId").val();
    var familyName = $("#familyName_id").val();
    $("#close-model").click();

    $.ajax({
        url: "family/update",
        data: {
            id: familyId,
            familyName: familyName
        },
        type: "POST",
        dataType: "text",
        success: function (data) {
            showAlertFamily(data);
            listFamily();
        }
    });
}

function showAlertFamily(msg) {
    $(".div-alert-parent").append("<div class=\"alert alert-success\" role=\"alert\">" + msg + "</div>");
    setInterval(hiddenAlertFamily, 3000);
}

function hiddenAlertFamily() {
    $(".div-alert-parent .alert-success").remove();
}

function deleteFamily(id) {
    if (id) {
        $.ajax({
            url: "family/delete",
            data: {
                id: id
            },
            type: "GET",
            dataType: "text",
            success: function (data) {
                showAlertFamily(data);
                listFamily();
            }
        });
    } else {
        showAlert("id不能为空哦");
    }
}

function addFamily() {
    $("#myModal_family .modal-dialog").empty();
    var html = "<div class=\"modal-dialog\">\n" +
        "                        <div class=\"modal-content\">\n" +
        "                            <div class=\"modal-header\">\n" +
        "                                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;\n" +
        "                                </button>\n" +
        "                                <h4 class=\"modal-title\">新建家庭</h4>\n" +
        "                            </div>\n" +
        "                            <div>\n" +
        "                                <div class=\"input-group field-param\">\n" +
        "                                    <span class=\"input-group-addon\" id=\"familyName_field\">家庭名称</span>\n" +
        "                                    <input type=\"text\" class=\"form-control\" id='familyName_id' placeholder=\"\" aria-describedby=\"basic-addon1\" value=\"\">\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "\n" +
        "                            <div class=\"modal-footer\">\n" +
        "                                <button type=\"button\" class=\"btn btn-default\" id='close-model' data-dismiss=\"modal\">关闭</button>\n" +
        "<input type='hidden' id='familyId' value=''>" +
        "                                <button type=\"button\" onclick='submitFamily()' class=\"btn btn-primary\">新建</button>\n" +
        "                            </div>\n" +
        "                        </div><!-- /.modal-content -->\n" +
        "                    </div>";

    $("#myModal_family").append(html);
}