$(document).ready(function () {
    var apiScope = ["grades"];

    jso_configure({
        "html-view-grades": {
            client_id: apiClientId,
            authorization: authorizeEndpoint
        }
    });
    jso_ensureTokens({
        "html-view-grades": apiScope
    });

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
        $.oajax({
            url: entitlementEndpoint,
            jso_provider: "html-view-grades",
            jso_scopes: apiScope,
            jso_allowia: true,
            type: "GET",
            dataType: 'json',
            async: false,
            success: function (data) {
                if(-1 !== data.entitlement.indexOf("urn:vnd:grades:administration")) {
                    // teacher, show list of students
                    renderStudentBox();
                    $("#studentListForm").show();
                    $("a#studentShow").click(function() {
                        var f = parseForm($('form#studentListForm'));
                        renderGradeList(f.studentList);
                    });
                } else {
                    // not a teacher, show own grades
                    renderGradeList("@me");
                }
            },
            error: function (xhr) {
                var data = JSON.parse(xhr.responseText);
                alert("ERROR: " + data.error_description);
            }
        });
    }

    function initPage() {
        checkEntitlement();
    }
    initPage();
});
