<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');

// Database connection parameters
$servername = "127.0.0.1:3306";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "user-login-data"; // Your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data sent via AJAX
$username = $_POST['username'];
$password = $_POST['password'];

// Escape user inputs for security
$username = $conn->real_escape_string($username);

// Prepare SQL statement to retrieve user from database
$stmt = $conn->prepare("SELECT * FROM profiles WHERE name = ?");
$stmt->bind_param("s", $username);

// Execute SQL statement
$stmt->execute();

// Get result
$result = $stmt->get_result();

// Check if user exists
if ($result->num_rows > 0) {
    // Fetch user data
    $row = $result->fetch_assoc();
    // Verify password
    if (password_verify($password, $row['password'])) {
        echo "Login successful.";
    } else {
        echo "Invalid username or password.";
    }
} else {
    echo "Invalid username or password.";
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
