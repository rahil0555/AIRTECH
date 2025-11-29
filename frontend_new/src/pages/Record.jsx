import { useNavigate } from "react-router-dom";
import VideoRecorder from "../components/VideoRecorder";
import { useState } from "react";

export default function Record() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  // This runs after video recording is done
  const handleFinish = async (videoBlob) => {
    console.log("📹 Recorded video blob:", videoBlob);

    if (!videoBlob) {
      alert("No video captured.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("video", videoBlob, "recording.webm");

    try {
      console.log("⬆️ Sending video to backend...");

      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      console.log("🔍 Backend response status:", res.status);

      if (!res.ok) {
        console.error("❌ Backend rejected request:", res.status);
        alert("Backend error. Check if backend is running.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("📥 Received backend JSON:", data);

      // Save analysis data
      localStorage.setItem("analysis", JSON.stringify(data));

      console.log("➡️ Navigating to /analytics");
      nav("/analytics");

    } catch (error) {
      console.error("❗ Error sending to backend:", error);
      alert("Failed to send video to backend. Check console.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>45-Second Speaking Test</h2>
      <p>
        The system will record a short video. Allow camera and microphone access.
      </p>

      {/* Video Recorder Component */}
      <VideoRecorder onFinish={handleFinish} />

      {loading && (
        <p style={{ marginTop: 16, color: "#D2042D" }}>
          ⏳ Analyzing your video… Please wait…
        </p>
      )}

      <p style={{ marginTop: 16, fontSize: 14, color: "gray" }}>
        🎥 Tip: Keep your face centered and maintain eye contact with the camera.
      </p>
    </div>
  );
}
