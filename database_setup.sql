-- Drop the old database if it exists
DROP DATABASE IF EXISTS feedback_system;

-- Create a new database
CREATE DATABASE feedback_system;
USE feedback_system;

-- Create students table
CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Create admin table
CREATE TABLE admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Insert default admin credentials
INSERT INTO admin (username, password)
VALUES ('admin', MD5('admin123'));

-- Create feedback table
CREATE TABLE feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  faculty_name VARCHAR(100) NOT NULL,
  course VARCHAR(100) NOT NULL,
  rating INT NOT NULL,
  comments TEXT,
  date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);
