import React from 'react';

const LogPanel = ({ logs }) => (
  <div style={{
    backgroundColor: '#001d3d',
    color: '#00b4d8',
    padding: '1rem',
    borderRadius: '8px',
    maxHeight: '200px',
    overflowY: 'auto'
  }}>
    <strong>Logs:</strong>
    <ul>
      {logs.map((log, i) => <li key={i}>{log}</li>)}
    </ul>
  </div>
);

export default LogPanel;
