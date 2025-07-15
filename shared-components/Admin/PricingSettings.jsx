import React, { useState } from "react";
import PricingSettingsRow from "./PricingControlComponents/PricingSettingsRow";

export default function PricingSettings( {pricing, onChange}) {
  const [config, setConfig] = useState({ rows: [] });
  return (
    <div>
              <>
        <h2>Pricing Settings</h2>
        <PricingSettingsRow
          rows={config.rows}
          onConfigChange={(newRows) => setConfig({ rows: newRows })}
        />
        </>
    </div>
);
}

