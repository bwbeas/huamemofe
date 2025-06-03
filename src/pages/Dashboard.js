import React, { useEffect, useState } from "react";


const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const apiBase = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("${apiBase}/entries", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setEntries(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Failed to retrieve entries");
      });
  }, []);

  
  const handleAddEntry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("${apiBase}/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed to add");

      const data = await res.json();
      setEntries((prev) => [data.entry, ...prev]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Add entry error:", err);
      alert("Could not add entry");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${apiBase}/entries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete");

      
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete entry");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-btn">
        logout
      </button>
      
      <h1>🦋 hi, how are you today?</h1>
      
      <form onSubmit={handleAddEntry}>
        <input
          type="text"
          value={title}
          placeholder="give me a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          placeholder="what are you thinking of? "
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">add entry</button>
      </form>

      <h2>🦋 your previous entries:</h2>
      <div className="entries-container">
        {entries.map((entry) => (
          <div key={entry._id} className="entry">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <small>
              {new Date(entry.date).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </small>
            <button onClick={() => handleDelete(entry._id)} className="delete-btn">
              delete
            </button>
          </div>
        ))}
      </div>
      <div className="footer">
  <p>©beas 2025</p>
</div>
    </div>
  );
};

export default Dashboard;

