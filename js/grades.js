$(document).ready(function () {
    var apiScope = ["grades"];

    function renderGradeList(studentId) {
        $.oajax({
            url: apiEndpoint + "/grades/" + studentId,
            jso_provider: "html-view-grades",
            jso_scopes: apiScope,
            jso_allowia: true,
            dataType: 'json',
            success: function (data) {
                $("#gradeList").html($("#gradeListTemplate").render(data));
            },
            error: function (xhr) {
                var data = JSON.parse(xhr.responseText);
                alert("ERROR: " + data.error_description);
            }
        });
    }

    function parseForm(formData) {
        var params = {};
        $.each(formData.serializeArray(), function (k, v) {
            params[v.name] = (v.value === '') ? null : v.value;
        });
        return params;
    }

    function renderStudentBox() {
        $.oajax({
            url: apiEndpoint + "/grades/",
            jso_provider: "html-view-grades",
            jso_scopes: apiScope,
            jso_allowia: true,
            dataType: 'json',
            success: function (data) {
                $("#studentList").html($("#studentListTemplate").render(data));
                // show the grades of the first available student
                renderGradeList(data[0].id);
            },
            error: function (xhr) {
                var data = JSON.parse(xhr.responseText);
                alert("ERROR: " + data.error_description);
            }
        });
    }

    function checkEntitlement() {
        var accessToken = jso_getToken("html-view-grades");
        if(accessToken) {
            $.ajax({
                url: tokenInfoEndpoint + "?access_token=" + accessToken,
                type: "GET",
                dataType: 'json',
                async: false,
                success: function (data) {
                    if(!data.attributes || !data.attributes.eduPersonEntitlement || -1 === data.attributes.eduPersonEntitlement.indexOf("urn:x-oauth:entitlement:administration")) {
                        // not a teacher, show own grades
                        renderGradeList("@me");
                    } else {
                        // teacher, show list of students
                        renderStudentBox();
                        $("#studentListForm").show();
                        $("select#studentList").bind('change', function() {
                            var f = parseForm($('form#studentListForm'));
                            renderGradeList(f.studentList);
                        });
                    }
                },
                error: function (xhr) {
                    var data = JSON.parse(xhr.responseText);
                    alert("ERROR: " + data.error_description);
                }
            });
        }
    }

    function initPage() {
        jso_configure({
            "html-view-grades": {
                client_id: apiClientId,
                authorization: authorizeEndpoint
            }
        });
        jso_ensureTokens({
            "html-view-grades": apiScope
        });

        checkEntitlement();
    }

    initPage();
});
