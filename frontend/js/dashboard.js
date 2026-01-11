// Get stored data
const scores = JSON.parse(localStorage.getItem("scores"));
const name = localStorage.getItem("userName");

// Safety check
if (!scores || !name) {
  window.location.href = "index.html";
}

// Summary text
document.getElementById("summaryText").innerText =
  `Hi ${name}, based on your responses, this analysis highlights your personality traits across social behavior, emotional stability, confidence, planning, and focus.`;

// Similar users count (from backend)
fetch(`http://localhost:5000/api/test/similar/${localStorage.getItem("personality")}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("similar").innerText =
      `${data.count} people have a personality profile similar to yours.`;
  })
  .catch(() => {
    document.getElementById("similar").innerText =
      "Unable to calculate similar profiles at the moment.";
  });

// Improvement links based on weak traits
const improvementLinks = {
  social: {
    text: "Improve Social Communication Skills",
    url: "https://www.mindtools.com/communication-skills"
  },
  emotional: {
    text: "Learn Stress & Emotion Management",
    url: "https://www.helpguide.org/articles/stress/stress-management.htm"
  },
  planning: {
    text: "Develop Better Planning & Time Management",
    url: "https://www.atlassian.com/time-management"
  },
  confidence: {
    text: "Build Self-Confidence",
    url: "https://www.verywellmind.com/build-self-confidence-4163098"
  },
  focus: {
    text: "Improve Focus & Concentration",
    url: "https://www.healthline.com/health/how-to-focus"
  }
};

const suggestionsList = document.getElementById("suggestions");
suggestionsList.innerHTML = "";

// Identify weak areas (threshold < 2)
Object.keys(scores).forEach(trait => {
  if (scores[trait] < 2) {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${improvementLinks[trait].url}" target="_blank">
        ${improvementLinks[trait].text}
      </a>
    `;
    suggestionsList.appendChild(li);
  }
});

// Chart rendering
const ctx = document.getElementById("chart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Social", "Emotional", "Planning", "Confidence", "Focus"],
    datasets: [{
      label: "Personality Score",
      data: [
        scores.social,
        scores.emotional,
        scores.planning,
        scores.confidence,
        scores.focus
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10
      }
    }
  }
});
