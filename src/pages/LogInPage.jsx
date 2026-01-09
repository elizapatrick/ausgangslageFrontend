import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LogInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="frame">
      <div className="panel">
        <h1 className="title">Anmelden</h1>
        
        <div className="card">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-MAIL-ADRESSE"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="PASSWORT"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="login-btn">
              ANMELDEN
            </button>
            
            <span className="register-link" onClick={() => navigate("/registrieren")}>
              Noch keinen Account? Hier Registrieren!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}