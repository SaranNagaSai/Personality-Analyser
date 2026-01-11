const BASE_URL = "https://personality-analyser.onrender.com";

async function login() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  if (!name || !password) {
    alert("Please enter name and password");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Login failed");
      return;
    }

    localStorage.setItem("userName", data.name);
    window.location.href = "test.html";

  } catch (error) {
    alert("Backend not reachable. Please try again later.");
  }
}
