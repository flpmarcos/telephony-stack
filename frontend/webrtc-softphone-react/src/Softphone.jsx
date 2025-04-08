import React, { useEffect, useRef, useState } from "react";
import { Web } from "sip.js";

const Softphone = ({ config, appendLog }) => {
  const [simpleUser, setSimpleUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [number, setNumber] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const options = {
        aor: config.aor,
        media: {
          constraints: { audio: true, video: false },
          remote: { audio: remoteAudioRef.current }
        },
        userAgentOptions: {
          authorizationUsername: config.username,
          authorizationPassword: config.password
        }
      };

      const su = new Web.SimpleUser(config.server, options);

      su.delegate = {
        onCallCreated: () => appendLog("📞 Chamada criada."),
        onCallAnswered: () => appendLog("✅ Chamada atendida."),
        onCallHangup: () => appendLog("🔚 Chamada encerrada."),
        onRegistered: () => appendLog("📡 Registrado com sucesso."),
        onServerConnect: () => appendLog("🟢 Conectado ao servidor."),
        onServerDisconnect: () => appendLog("🔴 Desconectado do servidor.")
      };

      try {
        await su.connect();
        await su.register();
        setSimpleUser(su);
        setConnected(true);
      } catch (error) {
        appendLog("❌ Falha ao conectar ou registrar.");
        console.error(error);
      }
    };

    init();
  }, [config]);

  const makeCall = async () => {
    if (simpleUser && number) {
      appendLog(`📞 Ligando para ${number}...`);
      await simpleUser.call(`sip:${number}@${config.aor.split("@")[1]}`);
    }
  };

  const hangUp = async () => {
    if (simpleUser) {
      appendLog("🔴 Desligando chamada.");
      await simpleUser.hangup();
    }
  };

  const toggleMute = () => {
    if (!simpleUser) return;
    if (isMuted) {
      simpleUser.unmute();
      appendLog("🔊 Microfone ativado.");
    } else {
      simpleUser.mute();
      appendLog("🔇 Microfone mutado.");
    }
    setIsMuted(!isMuted);
  };

  return (
    <div style={{
      background: "#1e2a38",
      padding: "30px",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px"
    }}>
      <h2 style={{ color: "#90e0ef" }}>Painel Softphone</h2>
      <input placeholder="Digite o número" value={number} onChange={e => setNumber(e.target.value)} />
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={makeCall}>Ligar</button>
        <button onClick={hangUp}>Desligar</button>
        <button onClick={toggleMute}>{isMuted ? "Desmutar" : "Mutar"}</button>
      </div>
      <audio ref={remoteAudioRef} autoPlay />
    </div>
  );
};

export default Softphone;