const BASE_URL = "https://personality-analyser.onrender.com";

function finishTest() {
  const scores = {
    social: Number(q1.value) + Number(q2.value),
    emotional: Number(q3.value) + Number(q4.value),
    planning: Number(q5.value) + Number(q6.value),
    confidence: Number(q7.value) + Number(q8.value),
    focus: Number(q9.value) + Number(q10.value)
  };

  fetch(`${BASE_URL}/api/test/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scores })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("scores", JSON.stringify(scores));
      localStorage.setItem("personality", data.personality);
      window.location.href = "dashboard.html";
    })
    .catch(() => {
      alert("Failed to submit test. Try again later.");
    });
}
