async function login() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userId", data.userId);
    window.location.href = "test.html";
  } else alert(data.msg);
}

