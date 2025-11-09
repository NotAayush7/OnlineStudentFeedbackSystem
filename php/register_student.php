<?php
// Handles student registration

include 'db_connect.php';

$name = $_POST['name'];
$email = $_POST['email'];
$password = md5($_POST['password']);

// Check if email already exists
$check = $conn->query("SELECT * FROM students WHERE email='$email'");
if ($check->num_rows > 0) {
  echo "Email already registered.";
  exit;
}

// Insert new student
$sql = "INSERT INTO students (name, email, password) VALUES ('$name', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
  echo "success";
} else {
  echo "Error: " . $conn->error;
}
?>
