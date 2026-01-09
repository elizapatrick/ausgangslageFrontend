import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }
    // Add your registration logic here
    console.log("Registration attempt:", { username, email, password });
  };

  return (
    <div className="frame">
      <div className="panel">
        <h1 className="title">Registrieren</h1>
        
        <div className="card">
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="NUTZERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
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
            
            <input
              type="password"
              placeholder="PASSWORT WIEDERHOLEN"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="login-btn">
              REGISTRIEREN
            </button>
            
            <span className="register-link" onClick={() => navigate("/")}>
              Du hast bereits ein Account? Melde dich hier an!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}