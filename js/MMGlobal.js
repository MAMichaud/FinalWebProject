$( document ).ready(function() {

    $('#mmForm :checkbox').change(function() { 
        if (this.checked) {
            $('#ratingArea').show()
        } else {
            $('#ratingArea').hide()
        }
    });

    $('#mmEditForm :checkbox').change(function() { 
        if (this.checked) {
            $('#ratingEditArea').show()
        } else {
            $('#ratingEditArea').hide()
        }
    });
    
    $('#mmFoodRating').bind('keyup mouseup', function () {
        ratingChange();           
    });
    $('#mmServiceRating').bind('keyup mouseup', function () {
        ratingChange();           
    });
    $('#mmValueRating').bind('keyup mouseup', function () {
        ratingChange();           
    });

    $('#mmEditFoodRating').bind('keyup mouseup', function () {
        ratingEditChange()          
    });
    $('#mmEditServiceRating').bind('keyup mouseup', function () {
        ratingEditChange()         
    });
    $('#mmEditValueRating').bind('keyup mouseup', function () {
        ratingEditChange()         
    });

    $("#mmSettingsPage").on("pageshow", function(){
        $("#mmDefaultEmail").val(localStorage.getItem("DefaultEmail"));
    });

    $("#mmAddFeedbackPage").on("pageshow", function(){
        $("#mmEmail").val(localStorage.getItem("DefaultEmail"));
        MMUpdateTypesDropdown();
    });

    initDB();

    $("#mmSave").on("click", MMAddFeedback);
    $("#mmUpdate").on("click", MMUpdateFeedback);
    $("#mmDelete").on("click", MMDeleteFeedback);
    $("#mmCancel").on("click", function(){
        $(location).prop('href', '#mmViewFeedbackPage');
    });
    $("#mmClearDatabase").on("click", MMClearDatabase);

    $("#mmViewFeedbackPage").on("pageshow", function(){
        MMGetReviews();
    });

    $("#mmEditFeedbackPage").on("pageshow", function(){
        MMShowCurrentReview();
    });

});

function ratingChange(){
    var valueOne = parseInt($('#mmFoodRating').val());
    var valueTwo = parseInt($('#mmServiceRating').val());
    var valueThree = parseInt($('#mmValueRating').val());

    try {
        var answer = Math.round((valueOne + valueTwo + valueThree) / 15 * 100 * 100)/100;
        $('#mmOverallRating').val(answer + '%');
      }
      catch(error) {
      }
}

function ratingEditChange(){
    var valueOne = parseInt($('#mmEditFoodRating').val());
    var valueTwo = parseInt($('#mmEditServiceRating').val());
    var valueThree = parseInt($('#mmEditValueRating').val());

    try {
        var answer = Math.round((valueOne + valueTwo + valueThree) / 15 * 100 * 100)/100;
        $('#mmEditOverallRating').val(answer + '%');
      }
      catch(error) {
      }
}

function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}
