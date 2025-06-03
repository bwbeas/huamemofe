import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>welcome to huamemo</h1>
      <h4>🦋an everyday memobook for you🦋</h4>
      <div className="home-buttons">
        <Link to="/signup">
          <button>sign up</button>
        </Link>
        <Link to="/login">
          <button>login</button>
        </Link>
      </div>
      <div className="footer">
  <p>©beas 2025</p>
</div>
    </div>
  );
}

export default Home;

