// Get stored data
const scores = JSON.parse(localStorage.getItem("scores"));
const name = localStorage.getItem("userName") || "Friend"; // Default to "Friend" if no name
const personality = localStorage.getItem("personality");

// Safety check - only redirect if scores are missing (user hasn't taken test)
if (!scores) {
  window.location.href = "test.html";
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
        text: "HBR: How to Manage Your Network",
        url: "https://hbr.org/topic/networking"
      },
      {
        text: "Ted Talk: The Power of Vulnerability",
        url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability"
      },
      {
        text: "Coursera: Strategic Leadership and Management",
        url: "https://www.coursera.org/specializations/strategic-leadership"
      },
      {
        text: "Psychology Today: Extroverts and Happiness",
        url: "https://www.psychologytoday.com/us/basics/extroversion"
      },
      {
        text: "MasterClass: Daniel Pink on Sales and Persuasion",
        url: "https://www.masterclass.com/classes/daniel-pink-teaches-sales-and-persuasion"
      }
    ]
  },
  "Calm Analyzer": {
    description: "As a Calm Analyzer, you excel at deep thinking and careful analysis. Here are resources to enhance your strengths:",
    links: [
      {
        text: "Quiet: The Power of Introverts (Susan Cain)",
        url: "https://www.quietrev.com/"
      },
      {
        text: "Cal Newport: Deep Work Book",
        url: "https://www.calnewport.com/books/deep-work/"
      },
      {
        text: "Headspace: Meditation for Focus",
        url: "https://www.headspace.com/meditation/focus"
      },
      {
        text: "Coursera: Data Analysis and Visualization",
        url: "https://www.coursera.org/specializations/data-analysis"
      },
      {
        text: "Verywell Mind: Benefits of Solitude",
        url: "https://www.verywellmind.com/the-benefits-of-being-alone-4769939"
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
    text: "SkillsYouNeed: Communication Skills",
    url: "https://www.skillsyouneed.com/ips/communication-skills.html"
  },
  emotional: {
    text: "Learn Stress & Emotion Management",
    url: "https://www.helpguide.org/articles/stress/stress-management.htm"
  },
  planning: {
    text: "Atlassian: How to Manage Time Better",
    url: "https://www.atlassian.com/blog/productivity/how-to-manage-time-better"
  },
  confidence: {
    text: "Build Self-Confidence",
    url: "https://www.verywellmind.com/build-self-confidence-4163098"
  },
  focus: {
    text: "Healthline: How to Stay Focused",
    url: "https://www.healthline.com/health/mental-health/how-to-stay-focused"
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

