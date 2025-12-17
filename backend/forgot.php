<?php
if (!isset($_POST['email'])) {
    echo "ERROR: No email provided";
    exit;
}

$email = $_POST['email'];

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "velora_database";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) { die("Connection failed: ".$conn->connect_error); }

// Check if email exists
$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo "ERROR: Email not found";
    exit;
}

// Generate temporary 6-character password
$tempPass = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, 6);

// Hash and update password in DB
$hashed = password_hash($tempPass, PASSWORD_DEFAULT);
$update = $conn->prepare("UPDATE users SET password=? WHERE email=?");
$update->bind_param("ss", $hashed, $email);
$update->execute();

echo "SUCCESS: $tempPass";

$conn->close();
?>
