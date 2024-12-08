function getRequest(url, on_success) {
    $.ajax({
        url: url,
        method: 'GET',
        beforeSend: function() {
            $("#overlay").css("display", "block");
        }
    }).done(function(response) {
        on_success(response);
    }).fail(function(xhr, status, error) {
        alert('Error has occurred');
    }).always(function() {
        $("#overlay").css("display", "none");
    });
}


function postRequest(url, data, on_success) {
    $.post({
        url: url,
        data: data,
        beforeSend: function() {
            $("#overlay").css("display", "block");
        }
    }).done(function(response) {
        on_success(response);
    }).fail(function(xhr, status, error) {
        alert('Error has occurred');
    }).always(function() {
        $("#overlay").css("display", "none");
    });
}


// /public/js/app.js
$('#signup_form').on('click', 'button', function (e) {
    e.preventDefault();
    const auth_content = $(this).closest('auth-content');
    const form_id = auth_content.find('form').attr('id');
    const form = $('#' + form_id);
    const formData = form.serialize();
    const url = form.attr('action');

    $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        success: function (response) {
            console.log(response);
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