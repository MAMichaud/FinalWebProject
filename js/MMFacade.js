function MMUpdateTypesDropdown() {
    var options = [];

    function callback(tx, results) {
        $('#mmType').html("");
        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];

            console.info("Id: " + row['id'] +
                " Name: " + row['name']);

            if (row['name'] == "Other") {
                $('#mmType').append($('<option>', {
                    value: row['id'],
                    text: row['name'],
                    selected: "selected"
                }));
            } else {
                $('#mmType').append($('<option>', {
                    value: row['id'],
                    text: row['name']
                }));
            }
        }
        $('#mmType').change();
    }
    type.selectAll(options, callback);

}

function MMAddFeedback() {
    if (EnterFormValidate()) {
        var captianName = $("#mmCName").val();
        var firstMateName = $("#mmFMName").val();
        var typeId = $("#mmType").val();
        var reviewerEmail = $("#mmEmail").val();
        var reviewerComments = $("#mmComments").val();
        var reviewDate = $("#mmReviewDate").val();
        var hasRating = $("#RatingsChkBox").prop("checked");


        if (hasRating) {
            var rating1 = $("#mmFoodRating").val();
            var rating2 = $("#mmServiceRating").val();
            var rating3 = $("#mmValueRating").val();
        } else {
            var rating1 = null;
            var rating2 = null;
            var rating3 = null;
        }

        var options = [captianName, firstMateName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3];

        function callback() {
            console.info("Success: Record inserted successfully");
            alert("New feedback added.");
        }

        review.insert(options, callback);
    }
    else {
        console.error("Form is not valid");
    }
}

function MMGetReviews() {
    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            console.info('Captian Name: ' + row["captianName"] +
                ' First Mate Name: ' + row["firstMateName"] +
                ' Reviewer Email: ' + row["reviewerEmail"] +
                ' Comments: ' + row["reviewerComments"] +
                'Rating 1: ' + row['rating1'] +
                'Rating 2: ' + row['rating2'] +
                'Rating 3: ' + row['rating3']);

            if (row['hasRating'] == "true") {
                var valueOne = row['rating1'];
                var valueTwo = row['rating2'];
                var valueThree = row['rating3'];

                var overall = Math.round((valueOne + valueTwo + valueThree) / 15 * 100 * 100) / 100;
                overall = overall + "%";
            } else {
                var overall = "Unrated";
            }

            htmlCode += '<li data-icon="false"><a href="#mmEditFeedbackPage" data-row-id= ' + row['id'] + '>' +
                '<h2>Captain Name: ' + row["captianName"] + '</h2>' +
                '<h3>First Mate Name: ' + row["firstMateName"] + '</h3>' +
                '<p>Reviewer Email: ' + row["reviewerEmail"] + '</p>' +
                '<p>Comments: ' + row["reviewerComments"] + '</p>' +
                '<p>Overall Rating: ' + overall + '</p> </a></li>';
        }

        var lv = $("#mmFeedbackList");

        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#mmFeedbackList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
        }
    }
    review.selectAll(options, callback);
}

function MMShowCurrentReview() {
    var localId = localStorage.getItem("id");

    var options = [localId];

    function callback(tx, results) {
        var row = results.rows[0];

        console.info('Captian Name: ' + row["captianName"] +
            ' First Mate Name: ' + row["firstMateName"] +
            ' Reviewer Email: ' + row["reviewerEmail"] +
            ' Comments: ' + row["reviewerComments"] +
            'Rating 1: ' + row['rating1'] +
            'Rating 2: ' + row['rating2'] +
            'Rating 3: ' + row['rating3']);

        $("#mmEditCName").val(row["captainName"]);
        $("#mmEditFMName").val(row["firstMateName"]);
        $(".mmEditType").val(row['typeId']);
        $("#mmEditEmail").val(row["reviewerEmail"]);
        $("#mmEditComments").val(row["reviewerComments"]);
        $("#mmEditReviewDate").val(row["reviewDate"]);

        if (row["hasRating"] == "true" && $("#RatingsEditChk").prop('checked')) {
            $("#RatingsEditChk").prop('checked', true);
            $("#mmEditFoodRating").val(row['rating1']);
            $("#mmEditServiceRating").val(row['rating2']);
            $("#mmEditValueRating").val(row['rating3']);
        } else if (row["hasRating"] == "true" && !$("#RatingsEditChk").prop('checked')) {
            $("#RatingsEditChk").click();
            $("#RatingsEditChk").prop('checked', true);
            $("#mmEditFoodRating").val(row['rating1']);
            $("#mmEditServiceRating").val(row['rating2']);
            $("#mmEditValueRating").val(row['rating3']);
        } else if (row["hasRating"] == "false" && $("#RatingsEditChk").prop('checked')) {
            $("#RatingsEditChk").click();
            $("#RatingsEditChk").prop('checked', false);
            $("#mmEditFoodRating").val("");
            $("#mmEditServiceRating").val("");
            $("#mmEditValueRating").val("");
        } else {
            $("#RatingsEditChk").prop('checked', false);
            $("#mmEditFoodRating").val("");
            $("#mmEditServiceRating").val("");
            $("#mmEditValueRating").val("");
        }
    }

    review.select(options, callback);
}

function MMUpdateFeedback() {
    var localId = localStorage.getItem("id");

    if (EditFormValidate()) {
        var captianName = $("#mmEditCName").val();
        var firstMateName = $("#mmEditFMName").val();
        var typeId = $(".mmEditType").val();
        var reviewerEmail = $("#mmEditEmail").val();
        var reviewerComments = $("#mmEditComments").val();
        var reviewDate = $("#mmEditReviewDate").val();
        var hasRating = $("#RatingsEditChk").prop("checked");


        if (hasRating) {
            var rating1 = $("#mmEditFoodRating").val();
            var rating2 = $("#mmEditServiceRating").val();
            var rating3 = $("#mmEditValueRating").val();
        } else {
            var rating1 = null;
            var rating2 = null;
            var rating3 = null;
        }
        var options = [captianName, firstMateName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, localId];

        function callback() {
            console.info("Success: Record updated successfully");
            alert("New feedback updated.");
            $(location).prop('href', '#mmViewFeedbackPage');
        }

        review.update(options, callback);
    }
    else {
        console.error("Form is not valid");
    }
}

function MMDeleteFeedback() {
    var localId = localStorage.getItem("id");
    var options = [localId];

    function callback() {
        console.info("Success: Record deleted successfully");
        alert("Feedback deleted.");
        $(location).prop('href', '#mmViewFeedbackPage');

    }

    review.delete(options, callback);
}

function MMClearDatabase() {
    DB.dropTables();
    alert("Database Cleared");
}