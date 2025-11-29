import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const nav = useNavigate();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("analysis");
    if (data) {
      setAnalysis(JSON.parse(data));
    }
  }, []);

  if (!analysis) {
    return (
      <div className="container">
        <h2>No analysis found</h2>
        <p>Please take a test first.</p>
        <button onClick={() => nav("/record")}>Go to Recording</button>
      </div>
    );
  }

  const chartData = [
    { name: "Tone", value: analysis.scores.tone },
    { name: "Pacing", value: analysis.scores.pacing },
    { name: "Pronunciation", value: analysis.scores.pronunciation },
    { name: "Visual", value: analysis.scores.visual_presence },
    { name: "Conscious", value: analysis.scores.consciousness },
    { name: "Summary", value: analysis.scores.summary },
  ];

  const colors = ["#008080", "#D2042D", "#008080", "#D2042D", "#008080", "#D2042D"];

  return (
    <div className="container">
      <h2>Your Speaking Analysis</h2>
      <p>Here is your performance breakdown based on your 45s video submission:</p>

      {/* ------------ BAR CHART ------------- */}
      <div className="chart-wrapper">
        <BarChart width={300} height={200} data={chartData}>
          <XAxis dataKey="name" stroke="#ccc" />
          <Bar dataKey="value">
            {chartData.map((d, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* ------------ PIE CHART ------------- */}
      <div className="chart-wrapper">
        <PieChart width={300} height={250}>
          <Pie
            data={chartData}
            cx={150}
            cy={120}
            outerRadius={90}
            innerRadius={40}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((d, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* ------------ STRENGTHS ------------- */}
      <h3>Strengths</h3>
      {analysis.strengths.length > 0 ? (
        <ul>
          {analysis.strengths.map((item, index) => (
            <li key={index} style={{ marginBottom: "6px" }}>
              ✅ {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>No major strengths identified.</p>
      )}

      {/* ------------ WEAKNESSES ------------- */}
      <h3 style={{ marginTop: 18 }}>Areas to Improve</h3>
      {analysis.weaknesses.length > 0 ? (
        <ul>
          {analysis.weaknesses.map((item, index) => (
            <li key={index} style={{ marginBottom: "6px", color: "#D2042D" }}>
              ⚠️ {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>You performed consistently across all areas!</p>
      )}

      {/* ------------ LEARNING PATH ------------- */}
      <h3 style={{ marginTop: 18 }}>Recommended Learning Path</h3>
      <ul>
        {analysis.learning_path.map((step, index) => (
          <li key={index} style={{ marginBottom: "6px" }}>
            📌 {step}
          </li>
        ))}
      </ul>

      {/* ------------ DRILLS CTA ------------- */}
      <button style={{ marginTop: 25 }} onClick={() => nav("/drills")}>
        Start Improvement Drills
      </button>
    </div>
  );
}
