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
$('#forget_password_form').on('submit', function (e) {
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
$('#reset_password_form').on('submit', function (e) {
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


// Forget Password Form Submission with GET method
$('#forget_password_form').on('submit', function (e) {
    e.preventDefault();
    const email = $('#email').val();

    $.ajax({
        type: 'GET',
        url: `/auth/forget-password?email=${email}`,
        success: function (response) {
            $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
        },
        error: function (error) {
            $('#message').html('<div class="alert alert-danger">Error: ' + error.responseJSON.message + '</div>');
        }
    });
});

// Reset Password Form Submission with GET method
$('#reset_password_form').on('submit', function (e) {
    e.preventDefault();
    const token = $('#token').val();
    const newPassword = $('#new-password').val();
    const confirmPassword = $('#confirm-password').val();

    // Validate that passwords match
    if (newPassword !== confirmPassword) {
        $('#message').html('<div class="alert alert-danger">Passwords do not match!</div>');
        return;
    }

    $.ajax({
        type: 'GET',
        url: `/auth/reset-password?token=${token}&newPassword=${newPassword}`,
        success: function (response) {
            $('#message').html('<div class="alert alert-success">' + response.message + '</div>');
        },
        error: function (error) {
            $('#message').html('<div class="alert alert-danger">Error: ' + error.responseJSON.message + '</div>');
        }
    });
});