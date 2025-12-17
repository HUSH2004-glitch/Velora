<?php
// configuration for XAMPP MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "velora_database";

// Establish Database Connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    // A connection failure is a fatal error.
    die("Connection failed: " . $conn->connect_error);
}

// Check for POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    //  Collect and sanitize user input.
    // Ensure keys match your JavaScript FormData keys.
    $full_name = $_POST['fullName'] ?? ''; 
    $email = $_POST['email'] ?? '';
    $pass = $_POST['password'] ?? '';
    $age = $_POST['age'] ?? '';
    $backup_email = $_POST['backupEmail'] ?? '';

    // Minimal Server-Side Validation
    if (empty($full_name) || empty($email) || empty($pass) || empty($age)) {
        echo "error"; 
        exit();
    }

    // Check for Duplicates (Email must be unique)
    $stmt_check = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
    $stmt_check->bind_param("s", $email);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        echo "exists";
        $stmt_check->close();
        $conn->close();
        exit();
    }
    $stmt_check->close();

    // Security: Hash the password
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    
    // NOTE: user_id, created_at, last_login are NOT included here.
    // The database will assign their default values.
    $stmt_insert = $conn->prepare("INSERT INTO users (full_name, email, password, age, backup_email) VALUES (?, ?, ?, ?, ?)");
    
    $stmt_insert->bind_param("sssis", $full_name, $email, $hashed_password, $age, $backup_email);

    if ($stmt_insert->execute()) {
        echo "success"; // Signal to JS that account was created
    } else {
        
        echo "error"; 
    }

    $stmt_insert->close();
}

$conn->close();
?>