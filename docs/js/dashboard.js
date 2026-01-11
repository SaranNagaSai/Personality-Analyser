const BASE_URL = "https://personality-analyser.onrender.com";

const scores = JSON.parse(localStorage.getItem("scores"));
const name = localStorage.getItem("userName");
const personality = localStorage.getItem("personality");

if (!scores || !name) {
  window.location.href = "index.html";
}

document.getElementById("summaryText").innerText =
  `Hi ${name}, this analysis reflects your social skills, emotional balance, confidence, planning ability, and focus.`;

// Fetch similar personality count
fetch(`${BASE_URL}/api/test/similar/${personality}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("similar").innerText =
      `${data.count} people share a similar personality profile.`;
  })
  .catch(() => {
    document.getElementById("similar").innerText =
      "Could not load similarity data.";
  });

// Improvement resources
const resources = {
  social: ["Improve Social Skills", "https://www.mindtools.com/communication-skills"],
  emotional: ["Manage Stress Better", "https://www.helpguide.org/articles/stress/stress-management.htm"],
  planning: ["Improve Planning Skills", "https://www.atlassian.com/time-management"],
  confidence: ["Build Self-Confidence", "https://www.verywellmind.com/build-self-confidence-4163098"],
  focus: ["Increase Focus", "https://www.healthline.com/health/how-to-focus"]
};

const list = document.getElementById("suggestions");
list.innerHTML = "";

Object.keys(scores).forEach(trait => {
  if (scores[trait] < 2) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${resources[trait][1]}" target="_blank">${resources[trait][0]}</a>`;
    list.appendChild(li);
  }
});

// Chart
new Chart(document.getElementById("chart"), {
  type: "bar",
  data: {
    labels: ["Social", "Emotional", "Planning", "Confidence", "Focus"],
    datasets: [{
      data: Object.values(scores),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true, max: 10 }
    }
  }
});
