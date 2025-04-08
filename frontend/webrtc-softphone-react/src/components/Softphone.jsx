import React, { useState } from 'react';

const Softphone = ({ onCall, onHangUp, onToggleMute }) => {
  const [destNumber, setDestNumber] = useState('');

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Digite o número SIP"
        value={destNumber}
        onChange={(e) => setDestNumber(e.target.value)}
        style={{ padding: '10px', width: '200px', marginRight: '10px' }}
      />
      <button onClick={() => onCall(destNumber)}>Ligar</button>
      <button onClick={onHangUp}>Desligar</button>
      <button onClick={onToggleMute}>Mutar/Desmutar</button>
    </div>
  );
};

export default Softphone;
