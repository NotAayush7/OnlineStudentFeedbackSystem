<?php
// Handles admin login authentication

include 'db_connect.php';

$username = $_POST['username'];
$password = md5($_POST['password']);

$sql = "SELECT * FROM admin WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  session_start();
  $_SESSION['admin_user'] = $username;
  header("Location: ../admin_dashboard.html");
  exit;
} else {
  echo "<script>
          alert('Invalid username or password.');
          window.location.href = '../admin_login.html';
        </script>";
}
?>
