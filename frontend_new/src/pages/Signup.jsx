import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
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
      <h2>Sign Up</h2>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />

      {error && <p style={{ color: "#D2042D" }}>{error}</p>}

      <button onClick={handleSignup}>Create Account</button>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
