/* script.js
   Handles Student Registration, Login, and Feedback Submission
   Developed by Aayush Kumar Karn
*/

document.addEventListener("DOMContentLoaded", () => {

  /* Student Login */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      fetch("php/login_student.php", { method: "POST", body: formData })
        .then(response => response.text())
        .then(data => {
          if (data.trim() === "success") {
            alert("Login successful. Redirecting to feedback page...");
            window.location.href = "feedback.html";
          } else {
            alert(data);
          }
        })
        .catch(error => console.error("Login error:", error));
    });
  }

  /* Student Registration */
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(registerForm);
      fetch("php/register_student.php", { method: "POST", body: formData })
        .then(response => response.text())
        .then(data => {
          if (data.trim() === "success") {
            alert("Registration successful! You can now log in.");
            registerForm.reset();
          } else {
            alert(data);
          }
        })
        .catch(error => console.error("Registration error:", error));
    });
  }

  /* Feedback Submission */
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(feedbackForm);
      fetch("php/submit_feedback.php", { method: "POST", body: formData })
        .then(response => response.text())
        .then(data => {
          if (data.trim() === "success") {
            alert("Feedback submitted successfully!");
            feedbackForm.reset();
          } else {
            alert(data);
          }
        })
        .catch(error => console.error("Feedback error:", error));
    });
  }

});
