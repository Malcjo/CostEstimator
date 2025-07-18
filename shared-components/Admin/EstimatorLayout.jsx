import React, { useState } from 'react';
import EstimatorLayoutRow from './LayoutControlComponents/EstimatorLayoutRow';

export default function EstimatorLayout({layout, onChange, pricing_Groups }) {
  // Example: you might fetch/load saved config here

  return (
    <div>
              <>
          <EstimatorLayoutRow
            rows={layout}
            onConfigChange={(newLayout) => onChange(newLayout)}
            pricingGroups={pricing_Groups}
          />

          <h3>Current Layout JSON</h3>
          <pre style={{
            background: '#f4f4f4', padding: '10px', borderRadius: '4px',
            overflowX: 'auto',
            color: 'black'
          }}>
            {JSON.stringify(layout, null, 2)}
          </pre>
        </>
    </div>
  );
}
