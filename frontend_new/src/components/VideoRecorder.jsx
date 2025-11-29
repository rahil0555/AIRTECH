import { useEffect, useRef, useState } from "react";

export default function VideoRecorder({ onFinish }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [timer, setTimer] = useState(45);
  const [recording, setRecording] = useState(false);
  const [permissionError, setPermissionError] = useState("");

  // Ask for camera + mic permission
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        setPermissionError("Please allow camera and microphone access.");
      });

    // Cleanup streams when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((t) => t.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    setRecording(true);
    setTimer(45);
    chunksRef.current = [];

    const stream = videoRef.current.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      onFinish(blob); // send video blob to parent
    };

    mediaRecorderRef.current.start();
    startTimer();
  };

  const startTimer = () => {
    let t = 45;
    const intervalId = setInterval(() => {
      t--;
      setTimer(t);
      if (t <= 0) {
        clearInterval(intervalId);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
        }
        setRecording(false);
      }
    }, 1000);
  };

  return (
    <div>
      <h3>Recording Time: {timer}s</h3>

      {permissionError && (
        <p style={{ color: "#D2042D" }}>
          {permissionError}
        </p>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width: "100%",
          borderRadius: 10,
          backgroundColor: "#000",
        }}
      />

      {!recording && !permissionError && (
        <button
          style={{ marginTop: 16, width: "100%" }}
          onClick={startRecording}
        >
          Start 45s Recording
        </button>
      )}

      {recording && (
        <p style={{ marginTop: 10, color: "#008080" }}>
          Recording in progress… it will auto-stop after 45s.
        </p>
      )}
    </div>
  );
}
