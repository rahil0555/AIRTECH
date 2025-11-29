import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to Speech Analyzer 🎤</h2>

      <p>Analyze your speaking skills and improve tone, pacing, and clarity.</p>

      <button onClick={() => nav("/home")}>
        Start Speaking Test
      </button>
    </div>
  );
}
