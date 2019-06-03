(function ($) {
    // 加载区块数据
    listUser();
})(jQuery);

function listUser() {
    $(".family-table-tr").remove();
    $.ajax({
        url: "user/list",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            for (var index in data) {
                var item = data[index];
                var userHtml = "<tr class='family-table-tr'>\n" +
                    "<td>" + item.username + "</td>\n" +
                    "<td>******</td>\n" +
                    "<td>" + item.familyName + "</td>\n" +
                    "<td>\n" +
                    "    <button class=\"btn btn-warning \" data-toggle=\"modal\" onclick='modelBoxUser(" + JSON.stringify(item) + ")' data-target=\"#myModal_user\">修改</button>\n" +
                    "    <button class=\"btn btn-danger \" data-toggle=\"modal\" onclick='deleteUser(" + item.id + ")' data-target=\"\">删除</button>\n" +
                    "</td>\n" +
                    " </tr>";
                $(".user-table").append(userHtml);
            }
        }
    });
}

function modelBoxUser(item) {
    var id = item.id;
    var username = item.username;
    var password = item.password;
    var familyId = item.familyId;
    var familyName = item.familyName;

    if (id && familyName) {
        $("#myModal_user .modal-dialog").empty();
        var html = "<div class=\"modal-dialog\">\n" +
            " <div class=\"modal-content\">\n" +
            "     <div class=\"modal-header\">\n" +
            "         <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;\n" +
            "         </button>\n" +
            "         <h4 class=\"modal-title\">修改用户 " + username + "</h4>\n" +
            "     </div>\n" +
            "     <div>\n" +
            "         <div class=\"input-group field-param\">\n" +
            "<input type='hidden' id='user_id_single' value='" + id + "'/>" +
            "             <span class=\"input-group-addon\" id=\"username_field\">用户名</span>\n" +
            "             <input type=\"text\" class=\"form-control\" id='username_id' placeholder=\"" + username + "\" aria-describedby=\"basic-addon1\" value=\"" + username + "\">\n" +
            "         </div>\n" +
            "         <div class=\"input-group field-param\">\n" +
            "             <span class=\"input-group-addon\" id=\"password_field\">密码</span>\n" +
            "             <input type=\"text\" class=\"form-control\" id='password_id' placeholder=\"\" aria-describedby=\"basic-addon1\" value=\"\">\n" +
            "         </div>\n" +
            "         <div id='family-select' class=\"input-group field-param family-select\">\n" +
            "             <span class=\"input-group-addon\" id=\"family_field\">所属家庭</span>\n" +

            "         </div>\n" +
            "     </div>\n" +
            "     <div class=\"modal-footer\">\n" +
            "       <button type=\"button\" class=\"btn btn-default\" id='close-model' data-dismiss=\"modal\">关闭</button>\n" +
            "       <input type='hidden' id='familyId' value='" + item.id + "'>" +
            "        <button type=\"button\" onclick='submitUser()' class=\"btn btn-primary\">提交更改</button>\n" +
            "        </div>\n" +
            "    </div><!-- /.modal-content -->\n" +
            "</div>";
        $("#myModal_user").append(html);
        loadFamilySelect(familyId, familyName);
    }
}

function loadFamilySelect(familyId, familyName) {
    // if (familyId) {
    $.ajax({
        url: "family/list",
        data: {},
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            var ulList = "";
            for (var index in data) {
                var item = data[index];
                var idFor = item.id;
                var familyNameFor = item.familyName;
                ulList += "<li><a onclick='changeFamily(" + JSON.stringify(item) + ")' href=\"javascript:void(0)\">" + familyNameFor + "</a></li>";
            }
            var familyMenu = "<div class=\"dropdown\">\n" +
                "            <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n" +
                "<span id='family_name_single'>" + familyName + "</span>" +
                "<input type='hidden' id='family_id_single' value='" + familyId + "'/>" +
                "                <span class=\"caret\"></span>\n" +
                "            </button>\n" +
                "            <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n" +
                ulList +
                "            </ul>\n" +
                "        </div>";
            $("#family-select").append(familyMenu);
        }
    });
    // }
}

function submitUser() {
    var id = $("#user_id_single").val();
    var familyId = $("#family_id_single").val();
    var username = $("#username_id").val();
    var password = $("#password_id").val();
    if (!username) {
        showAlertUser("用户名不能置为空");
    }
    if (!familyId) {
        showAlertUser("请选择一个家庭");
    }
    $.ajax({
        url: "user/update",
        data: {
            id: id,
            familyId: familyId,
            username: username,
            password: password
        },
        type: "POST",
        dataType: "text",
        success: function (data) {
            $("#close-model").click();
            showAlertUser(data);
            listUser();
        }
    });
}

function changeFamily(item) {
    $("#family_name_single").text(item.familyName)
    $("#family_id_single").val(item.id)
}

function showAlertUser(msg) {
    $(".div-alert-parent").append("<div class=\"alert alert-success\" role=\"alert\">" + msg + "</div>");
    setInterval(hiddenAlertUser, 3000);
}

function hiddenAlertUser() {
    $(".div-alert-parent .alert-success").remove();
}

function addUser() {
    $("#myModal_user .modal-dialog").empty();
    var html = "<div class=\"modal-dialog\">\n" +
        " <div class=\"modal-content\">\n" +
        "     <div class=\"modal-header\">\n" +
        "         <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;\n" +
        "         </button>\n" +
        "         <h4 class=\"modal-title\">新增用户</h4>\n" +
        "     </div>\n" +
        "     <div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "<input type='hidden' id='user_id_single' value=''/>" +
        "             <span class=\"input-group-addon\" id=\"username_field\">用户名</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='username_id' placeholder=\"\" aria-describedby=\"basic-addon1\" value=\"\">\n" +
        "         </div>\n" +
        "         <div class=\"input-group field-param\">\n" +
        "             <span class=\"input-group-addon\" id=\"password_field\">密码</span>\n" +
        "             <input type=\"text\" class=\"form-control\" id='password_id' placeholder=\"\" aria-describedby=\"basic-addon1\" value=\"\">\n" +
        "         </div>\n" +
        "         <div id='family-select' class=\"input-group field-param family-select\">\n" +
        "             <span class=\"input-group-addon\" id=\"family_field\">所属家庭</span>\n" +

        "         </div>\n" +
        "     </div>\n" +
        "     <div class=\"modal-footer\">\n" +
        "       <button type=\"button\" class=\"btn btn-default\" id='close-model' data-dismiss=\"modal\">关闭</button>\n" +
        "       <input type='hidden' id='familyId' value=''>" +
        "        <button type=\"button\" onclick='submitUser()' class=\"btn btn-primary\">提交更改</button>\n" +
        "        </div>\n" +
        "    </div><!-- /.modal-content -->\n" +
        "</div>";
    $("#myModal_user").append(html);
    loadFamilySelect('', '');
}

function deleteUser(id) {
    if (id) {
        $.ajax({
            url: "user/delete",
            data: {
                id: id
            },
            type: "GET",
            dataType: "text",
            success: function (data) {
                showAlertUser(data)
                listUser();
            }
        });
    } else {
        showAlertUser("id不能为空")
    }
}