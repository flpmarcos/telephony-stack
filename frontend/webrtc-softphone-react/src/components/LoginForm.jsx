import React, { useState, useEffect } from "react";

const LoginForm = ({ onConnect }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [server, setServer] = useState(localStorage.getItem("server") || "192.168.0.137");
  const [port, setPort] = useState(localStorage.getItem("port") || "5066");

  const handleConnect = () => {
    const wsUrl = `ws://${server}:${port}`;
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("server", server);
    localStorage.setItem("port", port);

    onConnect({
      wsUrl,
      username,
      password,
      aor: `sip:${username}@${server}`,
    });
  };

  return (
    <div style={{ background: "#001f3f", padding: 20, borderRadius: 10 }}>
      <h3>Conectar ao PBX</h3>
      <input placeholder="Ramal (username)" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <input placeholder="IP do PBX" value={server} onChange={e => setServer(e.target.value)} /><br />
      <input placeholder="Porta WebSocket" value={port} onChange={e => setPort(e.target.value)} /><br />
      <button onClick={handleConnect}>Conectar</button>
    </div>
  );
};

export default LoginForm;
