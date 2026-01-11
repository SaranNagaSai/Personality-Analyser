async function register() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registration successful");
    window.location.href = "index.html";
  } else alert(data.msg);
}
