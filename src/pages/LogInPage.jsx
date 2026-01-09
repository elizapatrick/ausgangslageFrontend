import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LogInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user info in localStorage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        // Navigate to calendar
        navigate("/calendar");
      } else {
        setError(data.message || "Login fehlgeschlagen");
      }
    } catch (err) {
      setError("Verbindung zum Server fehlgeschlagen. Stellen Sie sicher, dass der Backend-Server läuft.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frame">
      <div className="panel">
        <h1 className="title">Anmelden</h1>
        
        <div className="card">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="BENUTZERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="PASSWORT"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "WIRD ANGEMELDET..." : "ANMELDEN"}
            </button>
            
            {error && <div style={{ color: "red", fontSize: "12px", marginTop: "10px", textAlign: "center" }}>{error}</div>}
            
            <span className="register-link" onClick={() => navigate("/registrieren")}>
              Noch keinen Account? Hier Registrieren!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}