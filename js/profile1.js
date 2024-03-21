// Function to open settings
function openSettings() {
    var modal = document.getElementById("profileModal");
    modal.style.display = "block";
  }
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    var modal = document.getElementById("profileModal");
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    var modal = document.getElementById("profileModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  function sendData() {
    var username = localStorage.getItem('username');
    // Serialize form data
    var formData = $('#profileForm').serializeArray();

    // Convert serialized form data to JSON format
    var jsonData = {};
    $.each(formData, function(index, field) {
        jsonData[field.name] = field.value;
    });  
    
    jsonData['username'] = username;
    console.log(jsonData)
    alert(jsonData)
    // Convert JSON data to string
    var jsonString = JSON.stringify(jsonData);
    //Send AJAX request
    $.ajax({
        type: 'POST',
        url: '/PHP-MYSQL-MONGODB-REDIUS-BOOTSTRAP-AJAX-WEBSITE/php/profile.php', // Change this to your PHP script URL
        data: jsonString,
        success: function(response) {
            // Handle success response here
            console.log('Data sent successfully');
            console.log(response); // You can optionally do something with the response
            // window.location.href="profile.html";
            location.reload();

        },
        error: function(xhr, status, error) {
            // Handle error
            console.error('Error sending data:', error);
        }
    });
}

function showUpdateForm(){
    alert("Hello");
    var uform = document.getElementById("updateForm");
    uform.style.display = "block";
}
 
// Attach the sendData function to the form submission
$(document).ready(function() {
    $('#profileForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        sendData(); // Call the sendData function
    });
}); 

function checkUsernameInMongoDB() {
    
  // Retrieve username from local storage
  const username = localStorage.getItem('username');

  // Check if username is present
  if (username) {
      // Send AJAX request to PHP script
      $.ajax({
          url: '/PHP-MYSQL-MONGODB-REDIUS-BOOTSTRAP-AJAX-WEBSITE/php/profile.php',
          type: 'GET',
          contentType: 'application/x-www-form-urlencoded',
          data: { username: username },
          success: function(response) {
              // Parse response JSON
              var responseData = JSON.parse(response);
              console.log(responseData.usedredis);
              // Handle response
              if (responseData.exists) {
                var data = responseData.data;
                $('#name').text('Name: ' + data.name);
                $('#bio').text('Bio: ' + data.bio);
                $('#contactInfo').html('Phone: ' + data.phone + '<br>Email: ' + data.email);
                $('#personalDetails').html('DOB: ' + data.dob + '<br>Address: ' + data.address);
                $('#interests').text('Interests: ' + data.interests);
                $('#education').text('Education: ' + data.education);
                $('#skills').text('Skills: ' + data.skills);
                $('#experiences').text('Experiences: ' + data.experiences);
                $('#projects').text('Projects: ' + data.projects);
                  // Username exists, you can perform further actions here
              } else {
                  console.log('Username does not exist in MongoDB.');
                  // Username doesn't exist, handle accordingly
              }
          },
          error: function(xhr, status, error) {
              console.error('Error:', status, error);
          }
      });
  } else {
      alert("Kindly update user profile");
  }
}


checkUsernameInMongoDB();