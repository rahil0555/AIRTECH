import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="container">
      <h2>Take a Speaking Test</h2>

      <p>This will ask for camera + mic permission.</p>

      <button onClick={() => nav("/record")}>Take Test</button>
    </div>
  );
}
