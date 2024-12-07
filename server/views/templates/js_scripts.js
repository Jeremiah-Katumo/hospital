// /public/js/app.js
$('#signup_form').on('submit', function (e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/register',
        data: formData,
        success: function (response) {
            $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
        },
        error: function (error) {
            $('#message').html('<div class="alert alert-danger">Error: ' + error.responseJSON.message + '</div>');
        }
    });
});

$('#login_form').on('submit', function (e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/login',
        data: formData,
        success: function (response) {
            $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
        },
        error: function (error) {
            $('#message').html('<div class="alert alert-danger">Error: ' + error.responseJSON.message + '</div>');
        }
    });
});

// Forget Password Form Submission
$('#forget-password-form').on('submit', function (e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/auth/forget-password',
        data: formData,
        success: function (response) {
            $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
        },
        error: function (error) {
            $('#message').html('<div class="alert alert-danger">Error: ' + error.responseJSON.message + '</div>');
        }
    });
});

// Reset Password Form Submission
$('#reset-password-form').on('submit', function (e) {
    e.preventDefault();
    const formData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/auth/reset-password',
        data: formData,
        success: function (response) {
            $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
        },
        error: function (error) {
            $('#message').html('<div class="alert alert-danger">Error: ' + error.responseJSON.message + '</div>');
        }
    });
});
