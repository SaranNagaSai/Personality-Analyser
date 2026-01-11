const BASE_URL = "https://personality-analyser.onrender.com";

async function register() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!name || !phone || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Registration failed");
      return;
    }

    alert("Registration successful. Please login.");
    window.location.href = "index.html";

  } catch (error) {
    alert("Backend not reachable. Please try again later.");
  }
}
