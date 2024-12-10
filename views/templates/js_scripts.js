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


$(document).ready(function () {
    const token = localStorage.getItem('authToken'); // Or check cookies
    if (token) {
        // Optionally verify the token with the server
        $.ajax({
            url: '/verify-token',
            type: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            success: function () {
                // Token is valid, redirect to dashboard
                window.location.href = '/dashboards';
            },
            error: function () {
                // Token is invalid or expired; allow access to login page
                console.log('Invalid or expired token');
            }
        });
    }
});



// /public/js/app.js
$(document).on('submit', '#signup_form', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = {
        username: $('input[name="username"]').val(),
        email: $('input[name="email"]').val(),
        password: $('input[name="password"]').val(),
        confirm_password: $('input[name="confirm_password"]').val(),
        terms: $('input[name="terms"]').prop('checked')
    };

    // Validate password match
    if (formData.password !== formData.confirm_password) {
        alert('Passwords do not match!');
        return;
    }

    // Validate terms checkbox
    if (!formData.terms) {
        alert('You must agree to the terms and policy!');
        return;
    }

    // Send the form data to the server
    $.ajax({
        url: '/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            // alert(response.message || 'Registration successful!');
            window.location.href = '/login'; // Redirect to login page
        },
        error: function (xhr) {
            const errorResponse = xhr.responseJSON || {};
            alert(errorResponse.message || 'An error occurred during registration.');
        }
    });
});


$(document).on('submit', '#login_form', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Gather the form data
    const email = $('#login_form input[type="email"]').val().trim();
    const password = $('#login_form input[type="password"]').val().trim();
    const remember = $('#login_form input[name="remember"]').prop('checked');

    // Send the AJAX request
    $.ajax({
        url: '/login', // Match the controller endpoint
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: password,
            remember: remember
        }),
        beforeSend: function () {
            // Optional: Add a loading spinner or disable the button
            $('.btn-primary').prop('disabled', true).text('Logging in...');
        },
        success: function (response) {
            if (response.token) {
                // Store the token in localStorage or cookies
                localStorage.setItem('authToken', response.token);

                // Redirect to the dashboard or desired location
                window.location.href = response.redirect || '/dashboards';
            } else {
                // Show error message
                alert(response.message || 'Login failed. Please try again.');
            }
        },
        error: function (xhr, status, error) {
            // Handle server or network errors
            console.error('Error:', error);
            const errorMessage = xhr.responseJSON?.message || 'An error occurred. Please try again.';
            alert(errorMessage);
        },
        complete: function () {
            // Re-enable the button and reset its text
            $('.btn-primary').prop('disabled', false).text('Login');
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


// $('.datatable').DataTable({
//     stateSave: true,
//     scrollY: '200px',
//     scrollCollapse: true,
//     fixedColumns: true,
//     fixedHeader: true,
//     responsive: true,
//     // dom: 'Bfrtip',
//     buttons: [
//         'copy', 'csv', 'excel', 'pdf', 'print'
//     ],
//     columnDefs: [{
//         targets: [0],
//         orderable: false
//     }],
//     // deferLoading: 57,
//     // processing: true,
//     // serverSide: true,
// });

$('.datepicker').datepicker({
    format: 'yyyy-mm-dd'
});


// $('#hospitalTable').DataTable({
//     processing: true,
//     serverSide: true, // Set to true if implementing server-side processing
//     ajax: {
//         url: '/hospitals', // Endpoint serving the data
//         type: 'GET',
//         dataSrc: 'data' // Path to data array in the JSON response
//     },
//     columns: [
//         {
//             data: null,
//             render: function (data, type, row) {
//                 return `
//                     <a href="/hospitals/${row.id}" class="btn btn-outline-warning btn-rounded"><i class="fas fa-eye"></i></a>
//                     <a href="/hospitals/${row.id}/edit" class="btn btn-outline-info btn-rounded"><i class="fas fa-pen"></i></a>
//                     <a href="/hospitals/${row.id}/delete" class="btn btn-outline-danger btn-rounded"><i class="fas fa-trash"></i></a>
//                 `;
//             }
//         },
//         { data: 'name' },
//         { data: 'description' }, // Adjust to match your database column names
//         { data: 'email' },
//         { data: 'location' },
//         { data: 'phone'}
//     ]
// });

$('.datatable').DataTable({
    processing: true, // Show processing indicator
    serverSide: true, // Enable server-side processing
    scrollY: '200px',
    scrollCollapse: true,
    fixedColumns: true,
    fixedHeader: true,
    responsive: true,
    ajax: {
        url: '/hospitals', // Endpoint to fetch data
        type: 'POST', // Method to use for fetching data
    },
    columns: [
        {
            data: null,
            render: function (data, type, row) {
                return `
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${row.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${row.id}">Delete</button>
                `;
            },
        },
        { data: 'name' },
        { data: 'email' },
        { data: 'location' },
        { data: 'description' },
        { data: 'phone' },
    ],
});