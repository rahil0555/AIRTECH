import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      nav("/dashboard");
    } catch (err) {
      setError("Backend offline");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />

      {error && <p style={{ color: "#D2042D" }}>{error}</p>}

      <button onClick={handleLogin}>Login</button>

      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}
