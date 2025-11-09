<?php
// Handles feedback submission by logged-in students

include 'db_connect.php';
session_start();

if (!isset($_SESSION['student_email'])) {
  echo "Please log in to submit feedback.";
  exit;
}

$email = $_SESSION['student_email'];

// Get student ID from email
$get_student = $conn->query("SELECT student_id FROM students WHERE email='$email'");
$row = $get_student->fetch_assoc();
$student_id = $row['student_id'];

// Collect form data
$faculty = $_POST['faculty_name'];
$course = $_POST['course'];
$rating = $_POST['rating'];
$comments = $_POST['comments'];

// Insert feedback record
$sql = "INSERT INTO feedback (student_id, faculty_name, course, rating, comments)
        VALUES ('$student_id', '$faculty', '$course', '$rating', '$comments')";

if ($conn->query($sql) === TRUE) {
  echo "success";
} else {
  echo "Error: " . $conn->error;
}
?>
