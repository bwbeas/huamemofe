import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/dashboard";  
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleLogin}>
        <h2>welcome back 🦋</h2>
        <input 
          type="email" 
          placeholder="Your email address" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Your password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">sign in</button>
      </form>
      <div className="footer">
  <p>©beas 2025</p>
</div>
    </div>
  );
}

export default Login;
