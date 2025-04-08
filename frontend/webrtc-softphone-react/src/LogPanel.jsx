import React from "react";

const LogPanel = ({ log }) => {
  return (
    <div style={{
      flex: 1,
      backgroundColor: "#0d1b2a",
      padding: "20px",
      overflowY: "auto",
      fontSize: "14px",
      borderLeft: "1px solid #1a1a1a"
    }}>
      <h3 style={{ color: "#00b4d8" }}>📜 Log</h3>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {log.map((entry, idx) => (
          <div key={idx}>{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default LogPanel;