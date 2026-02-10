// Get stored data
const scores = JSON.parse(localStorage.getItem("scores"));
const name = localStorage.getItem("userName");
const personality = localStorage.getItem("personality");

// Safety check
if (!scores || !name) {
  window.location.href = "index.html";
}

// Summary text
document.getElementById("summaryText").innerText =
  `Hi ${name}, based on your responses, this analysis highlights your personality traits across social behavior, emotional stability, confidence, planning, and focus.`;


// Similar users count (static version - no backend needed)
// In a static app, we can show a motivational message instead
document.getElementById("similar").innerText =
  `You're unique! Your personality profile has been saved to your device.`;


// Personality-based resources
const personalityResources = {
  "Extrovert Thinker": {
    description: "As an Extrovert Thinker, you thrive in social settings and enjoy analytical challenges. Here are resources tailored for you:",
    links: [
      {
        text: "Leadership Skills for Extroverts",
        url: "https://www.forbes.com/leadership/"
      },
      {
        text: "Networking Strategies for Success",
        url: "https://www.linkedin.com/business/talent/blog/networking"
      },
      {
        text: "Critical Thinking and Problem Solving",
        url: "https://www.coursera.org/courses?query=critical%20thinking"
      },
      {
        text: "Public Speaking Mastery",
        url: "https://www.ted.com/playlists/226/before_public_speaking"
      },
      {
        text: "Team Collaboration Best Practices",
        url: "https://www.atlassian.com/team-playbook"
      }
    ]
  },
  "Calm Analyzer": {
    description: "As a Calm Analyzer, you excel at deep thinking and careful analysis. Here are resources to enhance your strengths:",
    links: [
      {
        text: "Deep Work and Focus Techniques",
        url: "https://www.calnewport.com/books/deep-work/"
      },
      {
        text: "Mindfulness and Meditation Practices",
        url: "https://www.headspace.com/meditation/meditation-for-beginners"
      },
      {
        text: "Strategic Planning and Analysis",
        url: "https://www.mindtools.com/strategic-planning"
      },
      {
        text: "Introvert Strengths in the Workplace",
        url: "https://www.quietrev.com/quiet-leadership-institute/"
      },
      {
        text: "Research and Analytical Skills",
        url: "https://www.coursera.org/courses?query=data%20analysis"
      }
    ]
  }
};

// Display personality-specific resources
const personalityInfo = document.getElementById("personalityTypeInfo");
const personalityResourcesList = document.getElementById("personalityResources");

if (personalityResources[personality]) {
  personalityInfo.innerText = personalityResources[personality].description;

  personalityResources[personality].links.forEach(resource => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${resource.url}" target="_blank">
        ${resource.text}
      </a>
    `;
    personalityResourcesList.appendChild(li);
  });
} else {
  personalityInfo.innerText = "Resources are being curated for your personality type.";
}

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

// If no weak areas, show encouraging message
if (suggestionsList.children.length === 0) {
  const li = document.createElement("li");
  li.style.listStyle = "none";
  li.innerText = "Great job! All your traits are well-developed. Keep up the excellent work!";
  suggestionsList.appendChild(li);
}

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
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Your Personality Profile',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
});

