import React, { useState, useEffect } from "react";

const LoginForm = ({ onConnect, appendLog }) => {
  const [aor, setAor] = useState("");
  const [server, setServer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const savedAor = localStorage.getItem("sip_aor");
    const savedServer = localStorage.getItem("sip_server");
    const savedUsername = localStorage.getItem("sip_username");
    const savedPassword = localStorage.getItem("sip_password");

    if (savedAor) setAor(savedAor);
    if (savedServer) setServer(savedServer);
    if (savedUsername) setUsername(savedUsername);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    appendLog("Tentando conectar...");

    // Salva os dados no localStorage
    localStorage.setItem("sip_aor", aor);
    localStorage.setItem("sip_server", server);
    localStorage.setItem("sip_username", username);
    localStorage.setItem("sip_password", password);

    const config = {
      aor,
      server,
      username,
      password
    };
    onConnect(config);
    appendLog("🔐 Login bem-sucedido.");
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#1b263b",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      width: "300px"
    }}>
      <h2 style={{ color: "#00b4d8", textAlign: "center" }}>Login SIP</h2>
      <input placeholder="AOR (e.g. sip:user@host)" value={aor} onChange={e => setAor(e.target.value)} required />
      <input placeholder="WebSocket Server (ws://...)" value={server} onChange={e => setServer(e.target.value)} required />
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" style={{ backgroundColor: "#0077b6", padding: "10px", color: "#fff", border: "none", borderRadius: "8px" }}>Conectar</button>
    </form>
  );
};

export default LoginForm;
