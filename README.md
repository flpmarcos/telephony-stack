# Asterisk WebRTC Lab

Este repositório contém ambientes para testes com o Asterisk (v13, v16, v18, v18.10), com foco em configuração de WebRTC e telefonia IP.

## 📁 Estrutura

.
├── asterisk
│   ├── 13/
│   ├── 16/
│   ├── 18/
│   └── 18.10/      # Versão usada para testes com WebRTC
├── backend/        # Backend para integração futura (Node.js)
└── README.md

## 🚀 Como executar

### 1. Escolha a versão do Asterisk
cd asterisk/18.10

### 2. Construa a imagem Docker
./docker-build.sh

### 3. Suba o container
./docker-run.sh

### 4. Acesse o container
./docker-exec.sh

### 5. Destrua o ambiente
./docker-destroy.sh

---

## 🌐 Teste WebRTC com Frontend

### Pré-requisitos
- Navegador compatível com WebRTC (Chrome ou Firefox)
- Certificado TLS válido no Asterisk
- Porta 8089 liberada para WebSocket
- Página frontend para registrar e fazer chamadas com WebRTC

### Sugestão de frontend usando SIP.js

Estrutura:
frontend/
├── index.html
├── config.js
└── script.js

#### index.html
<!DOCTYPE html>
<html>
<head><title>WebRTC Test</title></head>
<body>
  <h2>WebRTC Test com SIP.js</h2>
  <button onclick="makeCall()">Ligar</button>
  <video id="remoteVideo" autoplay></video>
  <script src="https://unpkg.com/sip.js@0.20.0/dist/sip.min.js"></script>
  <script src="config.js"></script>
  <script src="script.js"></script>
</body>
</html>

#### config.js
const config = {
  uri: 'sip:ramal1000@SEU_IP_PUBLICO',
  password: 'senha1000',
  wsServers: 'wss://SEU_IP_PUBLICO:8089/ws',
};

#### script.js
const userAgent = new SIP.UA(config);

function makeCall() {
  const session = userAgent.invite('sip:1001@SEU_IP_PUBLICO', {
    media: {
      constraints: { audio: true, video: false },
      render: {
        remote: document.getElementById('remoteVideo'),
      },
    },
  });
}

---

## ✅ Checklist para WebRTC funcionar

- [ ] http.conf com enabled=yes, bindaddr=0.0.0.0, tlsenable=yes, tlsbindaddr=0.0.0.0:8089
- [ ] pjsip.conf com webrtc=yes, transport=ws e tls
- [ ] Certificados TLS válidos em /etc/asterisk/keys/
- [ ] Codec opus e ulaw habilitados
- [ ] Porta 8089 liberada para WebSocket seguro (wss)
- [ ] Navegador acessando frontend via HTTPS (necessário para capturar mídia)

---

## 📌 Dica
Você pode usar ngrok ou configurar um domínio com HTTPS para facilitar testes locais via WebRTC com segurança.

---
