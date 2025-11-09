<?php
// Handles student login authentication

include 'db_connect.php';

$email = $_POST['email'];
$password = md5($_POST['password']);

$sql = "SELECT * FROM students WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  session_start();
  $_SESSION['student_email'] = $email;
  echo "success";
} else {
  echo "Invalid email or password.";
}
?>
