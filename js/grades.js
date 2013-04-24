$(document).ready(function () {
    var apiScope = ["grades"];

    jso_configure({
        "html-view-grades": {
            client_id: apiClientId,
            authorization: authorizeEndpoint
        }
    });

    function hasEntitlement(entitlement, callback) {
        var accessToken = jso_getToken("html-view-grades", apiScope);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", introspectionEndpoint + "?token=" + accessToken, true);
        xhr.onload = function (e) {
            var response = JSON.parse(xhr.responseText);
            var hasEntitlement = response['x-entitlement'] && -1 !== response['x-entitlement'].indexOf(entitlement);
            callback(hasEntitlement);
        }
        xhr.send();
    }

    function getStudents(callback) {
        var accessToken = jso_getToken("html-view-grades", apiScope);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiEndpoint + "/grades/", true);
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.onload = function (e) {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        }
        xhr.send();
    }

    function showGrades(userId, studentList) {
        var accessToken = jso_getToken("html-view-grades", apiScope);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiEndpoint + "/grades/" + userId, true);
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.onload = function (e) {
            var response = JSON.parse(xhr.responseText);
            var data = {
                grades: response,
            };
            if (studentList) {
                data.students = studentList;
                data.selected = userId;
            }
            $("div#container").html($("#gradeList").render(data));
        }
        xhr.send();
    }

    function performLogin() {
        jso_ensureTokens({
            "html-view-grades": apiScope
        });
    }

    $(document).on("click", "#startAuthz", function (event) {
        performLogin();
        event.preventDefault();
    });

    $(document).on("click", "#noAuthz", function (event) {
        alert("Without your explicit permission this application cannot work.");
        event.preventDefault();
    });

    $(document).on("change", "select#studentList", function (event) {
        $("select#studentList option:selected").each(function () {
            var userId = $(this).val();
            getStudents(function (studentList) {
                showGrades(userId, studentList);
            });
        });
    });

    function initPage() {
        var accessToken = jso_getToken("html-view-grades", apiScope);
        if (!accessToken) {
            // show login box
            $("div#container").html($("#authzBox").render());
        } else {
            // an access token already exists, make sure it is still valid...
            performLogin();
            hasEntitlement("urn:x-oauth:entitlement:administration", function (hasEntitlement) {
                if (hasEntitlement) {
                    // get student names
                    getStudents(function (studentList) {
                        // show grades for the first user
                        showGrades(studentList[0].id, studentList);
                    });
                } else {
                    // show grades for current user
                    showGrades("@me");
                }
            });
        }
    }

    initPage();
});
