<?php
// XAMPP MySQL Config
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "velora_database";

// DB Connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Only allow POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['email'] ?? '';
    $pass = $_POST['password'] ?? '';

    if (empty($email) || empty($pass)) {
        echo "invalid";
        exit();
    }

    // Fetch stored hash from DB
    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // If no user found
    if ($stmt->num_rows === 0) {
        echo "invalid";
        $stmt->close();
        $conn->close();
        exit();
    }

    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    // Verify password
    if (password_verify($pass, $hashed_password)) {
        echo "success";
    } else {
        echo "invalid";
    }

    $stmt->close();
}

$conn->close();
?>
