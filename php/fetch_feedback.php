<?php
// Fetches all feedback data for the admin dashboard

include 'db_connect.php';

$sql = "SELECT f.*, s.name AS student_name 
        FROM feedback f 
        JOIN students s ON f.student_id = s.student_id 
        ORDER BY f.date_submitted DESC";

$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);
?>
