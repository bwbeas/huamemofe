import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiBase = process.env.REACT_APP_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch(`${apiBase}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      window.location.href = "/login";
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSignup}>
        <h2>no worries, create an account rn</h2>
        <input 
          type="email" 
          placeholder="Your email address" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Choose a password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">create</button>
      </form>
      <div className="footer">
  <p>©beas 2025</p>
</div>
    </div>
  );
}

export default Signup;
