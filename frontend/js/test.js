function finishTest() {
  let scores = {
    social: Number(q1.value) + Number(q2.value),
    emotional: Number(q3.value) + Number(q4.value),
    planning: Number(q5.value) + Number(q6.value),
    confidence: Number(q7.value) + Number(q8.value),
    focus: Number(q9.value) + Number(q10.value)
  };

  // Determine personality type (static version - no backend)
  const personality = scores.social > 2 ? "Extrovert Thinker" : "Calm Analyzer";

  // Save to localStorage
  localStorage.setItem("scores", JSON.stringify(scores));
  localStorage.setItem("personality", personality);

  // Redirect to dashboard
  window.location.href = "dashboard.html";
}


