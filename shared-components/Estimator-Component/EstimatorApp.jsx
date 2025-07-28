import React from "react";
import StandardDropdown from "./StandardDropdown";

export default function EstimatorApp({ config }) {
  return (
    <div>
      {config.layout.map((row) => (
        <StandardDropdown
          key={row.id}
          label={row.label}
          pricingSet={row.pricingSet}
        />
      ))}
    </div>
  );
}
