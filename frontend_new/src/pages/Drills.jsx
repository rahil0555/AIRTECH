import { useState } from "react";

export default function Drills() {
  const [toneAttempt, setToneAttempt] = useState(0);
  const [pace, setPace] = useState("");

  return (
    <div className="container">
      <h2>Improvement Drills</h2>

      <h3>🎵 Tone Drill</h3>
      <p>Say this sentence, emphasizing the <b>bold</b> words:</p>
      <p><b>I really</b> enjoyed the <b>presentation today</b>.</p>

      <button onClick={() => setToneAttempt(toneAttempt + 1)}>
        Start Tone Practice
      </button>

      {toneAttempt > 0 && <p>Try again… emphasize the bold words more.</p>}

      <hr style={{ margin: "20px 0" }} />

      <h3>⏱ Pacing Drill</h3>

      <p>Read this at a steady pace:</p>
      <i>"Good communication builds confidence and clarity."</i>

      <br /><br />

      <button onClick={() => setPace("fast")}>Simulate Too Fast</button>
      <button onClick={() => setPace("slow")} style={{ marginLeft: 10 }}>
        Simulate Too Slow
      </button>
      <button onClick={() => setPace("good")} style={{ marginLeft: 10 }}>
        Simulate Good
      </button>

      {pace === "fast" && <p>You are speaking too fast — slow down.</p>}
      {pace === "slow" && <p>You are speaking too slow — speed up slightly.</p>}
      {pace === "good" && <p>Great pacing! Keep it consistent.</p>}
    </div>
  );
}
