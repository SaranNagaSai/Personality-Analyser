function finishTest() {
  let scores = {
    social: Number(q1.value) + Number(q2.value),
    emotional: Number(q3.value) + Number(q4.value),
    planning: Number(q5.value) + Number(q6.value),
    confidence: Number(q7.value) + Number(q8.value),
    focus: Number(q9.value) + Number(q10.value)
  };

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  fetch("http://localhost:5000/api/test/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scores, userName, userId })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("scores", JSON.stringify(scores));
      localStorage.setItem("personality", data.personality);
      window.location.href = "dashboard.html";
    });
}

