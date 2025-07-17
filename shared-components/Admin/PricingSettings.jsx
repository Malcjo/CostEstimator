import React, { useState } from "react";
import PricingSettingsRow from "./PricingControlComponents/PricingSettingsRow";

export default function PricingSettings({ pricing, onChange }) {
  const [config, setConfig] = useState({ rows: [] });
  return (
    <div>
      <>
        <h2>Pricing Settings</h2>
        <PricingSettingsRow
          rows={pricing}
          onConfigChange={(newRows) => onChange(newRows)}
        />
        <h3>Current Pricing JSON</h3>
        <pre style={{
          background: '#f4f4f4', padding: '10px', borderRadius: '4px',
          overflowX: 'auto',
          color: 'black'
        }}>
          {JSON.stringify(pricing, null, 2)}
        </pre>
      </>
    </div>
  );
}

