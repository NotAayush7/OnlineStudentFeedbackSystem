/* admin.js
   Handles Admin Dashboard Search and Chart Visualization
   Developed by Aayush Kumar Karn
*/

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const tableBody = document.querySelector("#feedbackTable tbody");
  let feedbackData = [];

  // Fetch Feedback Data from PHP (AJAX)
  fetch("php/fetch_feedback.php")
    .then(response => response.json())
    .then(data => {
      feedbackData = data;
      renderTable(data);
      renderChart(data);
    })
    .catch(error => console.error("Error loading feedback data:", error));

  // Render Feedback Table
  function renderTable(data) {
    tableBody.innerHTML = "";
    if (data.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='7'>No feedback found</td></tr>";
      return;
    }
    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.feedback_id}</td>
        <td>${row.student_name}</td>
        <td>${row.faculty_name}</td>
        <td>${row.course}</td>
        <td>${row.rating}</td>
        <td>${row.comments || "-"}</td>
        <td>${row.date_submitted}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Search Filter Functionality
  searchBar.addEventListener("keyup", e => {
    const query = e.target.value.toLowerCase();
    const filtered = feedbackData.filter(fb =>
      fb.faculty_name.toLowerCase().includes(query) ||
      fb.course.toLowerCase().includes(query)
    );
    renderTable(filtered);
  });

  // Chart Visualization using Chart.js
  function renderChart(data) {
    const ratingCounts = [0, 0, 0, 0, 0];
    data.forEach(item => {
      const rating = item.rating;
      if (rating >= 1 && rating <= 5) ratingCounts[rating - 1]++;
    });

    const ctx = document.getElementById("ratingChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"],
        datasets: [{
          label: "Number of Feedbacks",
          data: ratingCounts,
          backgroundColor: [
            "#e74c3c",
            "#f39c12",
            "#f1c40f",
            "#2ecc71",
            "#3498db"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Feedback Rating Distribution"
          }
        }
      }
    });
  }
});
