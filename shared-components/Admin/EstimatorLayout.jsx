import React, { useState } from 'react';
import EstimatorLayoutRow from './LayoutControlComponents/EstimatorLayoutRow';

export default function EstimatorLayout({ activeTab, onSave }) {
  // Example: you might fetch/load saved config here
  const [config, setConfig] = useState({ rows: [] });

  return (
    <div>
      {activeTab === 'Layout' && (
        <>
          <EstimatorLayoutRow
            rows={config.rows}
            onConfigChange={(newRows) => setConfig({ rows: newRows })}
          />

          <button onClick={() => onSave(config)}>Save Layout</button>

          <h3>Current Layout JSON</h3>
          <pre style={{
            background: '#f4f4f4', padding: '10px', borderRadius: '4px',
            overflowX: 'auto',
            color: 'black',
          }}>
            {JSON.stringify(config, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
