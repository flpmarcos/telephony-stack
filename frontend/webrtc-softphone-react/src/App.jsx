import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Softphone from "./Softphone";
import LogPanel from "./LogPanel";

const App = () => {
  const [connectionConfig, setConnectionConfig] = useState(null);
  const [log, setLog] = useState([]);

  const appendLog = (message) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      height: "100vh",
      color: "white",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!connectionConfig ? (
          <LoginForm onConnect={setConnectionConfig} appendLog={appendLog} />
        ) : (
          <Softphone config={connectionConfig} appendLog={appendLog} />
        )}
      </div>
      <LogPanel log={log} />
    </div>
  );
};

export default App;