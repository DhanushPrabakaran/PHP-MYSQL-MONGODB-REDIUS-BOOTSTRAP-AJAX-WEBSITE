function loginUser() {
    var username = $('#username').val();
    var password = $('#password').val();

    // Data to be sent to the PHP file
    var data = {
        username: username,
        password: password
    };

    // AJAX request
    $.ajax({
        type: 'POST',
        url: '/PHP-MYSQL-MONGODB-REDIUS-BOOTSTRAP-AJAX-WEBSITE/php/login.php', // URL to your PHP login script
        data: data,
        success: function(response){

            if(response == "Login successful."){
                window.location.href="index.html";
                const localStorage = window.localStorage;
                localStorage.setItem("username", username);
            }
            else{
                alert("Invalid username or password");
            }
            // Handle success
            console.log(response);
            // You can add further handling here, like redirecting to another page on successful login.
        },
        error: function(xhr, status, error){
            // Handle errors
            console.error(xhr.responseText);
            // You can add further error handling here, like showing an error message to the user.
        }
    });
}

