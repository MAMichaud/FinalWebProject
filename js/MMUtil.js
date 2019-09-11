function EnterFormValidate() {
    $('#mmForm').validate({
        rules: {
            mmCName: {
                required: true,
                minlength: 2,
                maxlength: 40
            },
            mmFMName: {
                required: true,
                minlength: 2,
                maxlength: 40
            },
            mmEmail: {
                required: true,
                email: true
            },
            mmReviewDate: {
                required: true,
                date: true
            },
            mmFoodRating: {
                range: [0, 5],
                required: '#RatingsChkBox:checked'
            },
            mmServiceRating: {
                range: [0, 5],
                required: '#RatingsChkBox:checked'
            },
            mmValueRating: {
                range: [0, 5],
                required: '#RatingsChkBox:checked'
            },
        },
        messages: {
            mmCName: {
                required: 'Must enter a name',
                minlength: 'Name must be at least two characters',
                maxlength: 'Name must be less than 40 characters'
            },
            mmFMName: {
                required: 'Must enter a name',
                minlength: 'Name must be at least two characters',
                maxlength: 'Name must be less than 40 characters'
            },
            mmEmail: {
                required: 'Email is required',
                email: 'Email must be valid'
            },
            mmReviewDate: {
                required: 'Date required'
            },
            mmFoodRating: {
                range: 'Must be 0-5',
                required: 'Must rate Food'
            },
            mmServiceRating: {
                range: 'Must be 0-5',
                required: 'Must rate Service'
            },
            mmValueRating: {
                range: 'Must be 0-5',
                required: 'Must rate Value'
            },
        }
    });
    return $('#mmForm').valid();
}

function EditFormValidate() {
    $('#mmEditForm').validate({
        rules: {
            mmEditName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            mmEditEmail: {
                required: true,
                email: true
            },
            mmEditReviewDate: {
                required: true,
                date: true
            },
            mmEditFoodRating: {
                range: [0, 5],
                required: '#RatingsEditChk:checked'
            },
            mmEditServiceRating: {
                range: [0, 5],
                required: '#RatingsEditChk:checked'
            },
            mmEditValueRating: {
                range: [0, 5],
                required: '#RatingsEditChk:checked'
            },
        },
        messages: {
            mmEditName: {
                required: 'Must enter a name',
                minlength: 'Name must be at least two characters',
                maxlength: 'Name must be less than 20 characters'
            },
            mmEditEmail: {
                required: 'Email is required',
                email: 'Email must be valid'
            },
            mmEditReviewDate: {
                required: 'Date required'
            },
            mmEditFoodRating: {
                range: 'Must be 0-5',
                required: 'Must rate Food'
            },
            mmEditServiceRating: {
                range: 'Must be 0-5',
                required: 'Must rate Service'
            },
            mmEditValueRating: {
                range: 'Must be 0-5',
                required: 'Must rate Value'
            },
        }
    });
    return $('#mmEditForm').valid();
}

function AddEmail(){
    var email = $('#mmDefaultEmail').val();
    localStorage.setItem('DefaultEmail', email);
    alert('Email: ' + email + ' has been saved.')
}